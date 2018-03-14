



//SHOW LANGUAGE CODES TO USER ON CLICKING HELP LINK
 $('#langhelp').on('click',function () {
    var msg = "These are the languages and their langids: \n[LANGID]: [LANGUAGE]\n";
    var langs = [];
    for (var i in LANGS)
    {
        msg += LANGS[i][0] + ": " + i +"\n";	
    }

    alert(msg);
});


//COMPILE USER GIVEN CODE
$('#send').on('click', function() {
    var langid = $('#langid').val();
    var codeF = $('#code').val();
    var stdin = $('#stdin').val();
// passing the json file to the page 
    var json = {
        language: langid,
        code: codeF,
        stdin:stdin
    };
    console.log(json);

    $.post("/compile", json, function(data, error, xhr) {

        document.getElementById("output").innerHTML = data.output;
    });
});


//RUN TESTS ON ALL LANGUAGES
var langid_to_name = [];

$('#testAll').on('click', function() {
    //send compile request for each language
    for (var i in LANGS) {
        var langid = LANGS[i][0];
        var codeF = Codes[i];
        langid_to_name[langid] = i;

        //prepare data
        var json = {
            language: langid,
            code: codeF
        };

        //send post and print result
        $.post("/compile", json, function(data, error, xhr) {

            $("#testsoutput").append("<b>"+langid_to_name[data.langid] + "</b>: " +
                data.output + "<br><br>");
        });

    }
});