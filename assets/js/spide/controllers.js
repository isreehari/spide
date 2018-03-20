(function(angular){
    'use strict';


    function MainControllerFun($scope,spIDEService){

        var thisCtr = this;

        thisCtr.spCodeEditor = {
                                lang: '',
                                theme: '',
                                code: '',
                                stdin: '',
                                stdOut: '',
                                };

         // List of languages
        thisCtr.listLanguages = [
                                    {id:0 ,mode:"python", lang: "Python", type:"text/x-python", code: "print \"Hello\""},
                                    {id:1 ,mode:"ruby", lang: "Ruby", type:"text/x-ruby", code: "puts \"Hello\""},
                                    {id:2 ,mode:"clojure", lang: "Clojure", type:"text/x-clojure", code: '(println "Hello")'},
                                    {id:3 ,mode:"php", lang: "PHP", type:"text/x-php", code: "<?php\n$ho = fopen('php://stdout', \"w\");\n\nfwrite($ho, \"Hello\");\n\n\nfclose($ho);\n"},
                                    {id:4 ,mode:"javascript", lang: "Plain JavaScript", type:"text/javascript", code:  "//Not happy with Plain JS? Use JS/HTML/CSS option for using your own libraries.\n\nconsole.log(\"Hello\");"},
                                    {id:5 ,mode:"scala", lang: "Scala", type:"text/x-scala", code: "object HelloWorld {def main(args: Array[String]) = println(\"Hello\")}"},
                                    {id:6 ,mode:"golang", lang: "Go", type:"text/x-go", code: "package main\nimport \"fmt\"\n\nfunc main(){\n  \n\tfmt.Printf(\"Hello\")\n}"},
                                    {id:7 ,mode:"c_cpp", lang: "C/C++", type:"text/x-c++src", code: "#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout<<\"Hello\";\n\treturn 0;\n}"},
                                    {id:8 ,mode:"java", lang: "Java", type:"text/x-java", code: "/* package whatever; // don't place package name! */\n\nimport java.io.*;\n\nclass myCode\n{\n\tpublic static void main (String[] args) throws java.lang.Exception\n\t{\n\t\t\n\t\tSystem.out.println(\"Hello\");\n\t}\n}"},
                                    {id:9 ,mode:"vbscript", lang: "VB.NET", type:"text/x-vb", code: "Imports System\n\nPublic Class Test\n\tPublic Shared Sub Main() \n    \tSystem.Console.WriteLine(\"Hello\")\n\tEnd Sub\nEnd Class"},
                                    {id:10 ,mode:"csharp", lang: "C#", type:"text/x-csharp", code: "using System;\n\npublic class Test\n{\n\tpublic static void Main()\n\t{\n\t\t\tConsole.WriteLine(\"Hello\");\n\t}\n}"},
                                    {id:11 ,mode:"scheme", lang: "Bash", type:"text/x-bash", code: "echo 'Hi' "},
                                    {id:12 ,mode:"objectivec", lang: "Objective-C", type:"text/x-objectivec", code: "#include <Foundation/Foundation.h>\n\n@interface Test\n+ (const char *) classStringValue;\n@end\n\n@implementation Test\n+ (const char *) classStringValue;\n{\n    return \"Hey!\";\n}\n@end\n\nint main(void)\n{\n    printf(\"%s\\n\", [Test classStringValue]);\n    return 0;\n}"},
                                    {id:13 ,mode:"mysql", lang: "MySQL", type:"text/x-sql", code: "create table myTable(name varchar(10));\ninsert into myTable values(\"Hello\");\nselect * from myTable;"},
                                    {id:14 ,mode:"perl", lang: "Perl", type:"text/x-perl", code: "use strict;\nuse warnings\n;use v5.14; say 'Hello';"},                                    
                                    {id:15 ,mode:"rust", lang: "Rust", type:"text/rust", code: "fn main() {\n\tprintln!(\"Hello\");\n}"},
                                ];
        thisCtr.listThemes = [
                                    {code:"ambiance", displayName: "Ambiance"},
                                    {code:"chaos", displayName: "Chaos"},
                                    {code:"chrome", displayName: "Chrome"},
                                    {code:"clouds", displayName: "Clouds"},
                                    {code:"clouds_midnight", displayName: "Clouds Midnight"},
                                    {code:"cobalt", displayName: "Cobalt" },
                                    {code:"crimson_editor", displayName: "Crimson Editor"},
                                    {code:"dawn", displayName: "Dawn"},
                                    {code:"dracula", displayName: "Dracula"},
                                    {code:"dreamweaver", displayName: "Dreamweaver"},
                                    {code:"eclipse", displayName: "Eclipse"},
                                    {code:"github", displayName: "Github"},
                                    {code:"gob", displayName: "Gob"},
                                    {code:"gruvbox", displayName: "Gruvbox"},
                                    {code:"idle_fingers", displayName: "Idle Fingers"},                                    
                                    {code:"iplastic", displayName: "IPLastic"},
                                    {code:"katzenmilch", displayName: "Katzenmilch"},
                                    {code:"kr_theme", displayName: "KR Theme"},
                                    {code:"kuroir", displayName: "kuroir"},
                                    {code:"merbivore", displayName: "Merbivore"},
                                    {code:"merbivore_soft", displayName: "Merbivore soft"},
                                    {code:"mono_industrial", displayName: "Mono Industrial" },
                                    {code:"monokai", displayName: "Monokai"},
                                    {code:"pastel_on_dark", displayName: "Pastel On Dark"},
                                    {code:"solarized_dark", displayName: "Solarized Dark"},
                                    {code:"solarized_light", displayName: "Solarized Light"},
                                    {code:"sqlserver", displayName: "SQL Server"},
                                    {code:"terminal", displayName: "Terminal"},
                                    {code:"textmate", displayName: "Textmate"},
                                    {code:"tomorrow", displayName: "Tomorrow"},
                                    {code:"tomorrow_night", displayName: "Tomorrow Night"},                                    
                                    {code:"tomorrow_night_blue", displayName: "Tomorrow Night Blue"},
                                    {code:"tomorrow_night_bright", displayName: "Tomorrow Night Bright"},
                                    {code:"tomorrow_night_eighties", displayName: "Tomorrow Night Eighties"},
                                    {code:"twilight", displayName: "Twilight"},
                                    {code:"vibrant_ink", displayName: "Vibrant Ink"},
                                    {code:"xcode", displayName: "xCode"}
                                ];

                
        thisCtr.spCodeEditor.lang = thisCtr.listLanguages[8];  
        thisCtr.spCodeEditor.theme = thisCtr.listThemes[8];
        thisCtr.spCodeEditor.code = thisCtr.spCodeEditor.lang.code;      
        

        // The ui-ace option
        thisCtr.aceOption = {
                mode: thisCtr.spCodeEditor.lang.lang.toLowerCase(),
                theme: thisCtr.spCodeEditor.theme.code.toLowerCase(),
                onLoad: function (_ace) {

                    _ace.setShowPrintMargin(false);

                    // HACK to have the ace instance in the scope...
                    thisCtr.langChanged = function () {
                        thisCtr.spCodeEditor.code =  thisCtr.spCodeEditor.lang.code;                       
                        _ace.getSession().setMode('ace/mode/' + thisCtr.spCodeEditor.lang.mode.toLowerCase());
                    };

                    thisCtr.themeChanged = function () {                                              
                        _ace.setTheme('ace/theme/' + thisCtr.spCodeEditor.theme.code.toLowerCase());
                    };

                }
            };

        thisCtr.runCode = function(){
            var requestedCodeObj = {
                                        language: thisCtr.spCodeEditor.lang.id,
                                        code: thisCtr.spCodeEditor.code,
                                        stdin: thisCtr.spCodeEditor.stdin
                                    };

            spIDEService.runCode(requestedCodeObj).then(function(returnData){
                thisCtr.spCodeEditor.stdOut = returnData.data;
            });
        }
      
        

       
    }

/**
 *
 * Pass all functions into module
 */
angular.module('spide')
    .controller('MainController', ['$scope','spIDEService',MainControllerFun])    
})(window.angular);
