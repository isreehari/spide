(function(angular){
    'use strict';


    function MainControllerFun($scope){

        var thisCtr = this;

        thisCtr.spCodeEditor = {
                                lang: '',
                                theme: '',
                                code: ''
                                };

         // The modes
        thisCtr.listLanguages = [
                                    {lang: "Perl", type:"text/x-perl", code: "use strict;\nuse warnings\n;use v5.14; say 'Hello';"},
                                    {lang: "MySQL", type:"text/x-sql", code: "create table myTable(name varchar(10));\ninsert into myTable values(\"Hello\");\nselect * from myTable;"},
                                    {lang: "Java", type:"text/x-java", code: "/* package whatever; // don't place package name! */\n\nimport java.io.*;\n\nclass myCode\n{\n\tpublic static void main (String[] args) throws java.lang.Exception\n\t{\n\t\t\n\t\tSystem.out.println(\"Hello\");\n\t}\n}"},
                                    {lang: "C/C++", type:"text/x-c++src", code: "#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout<<\"Hello\";\n\treturn 0;\n}"},
                                    {lang: "C#", type:"text/x-csharp", code: "using System;\n\npublic class Test\n{\n\tpublic static void Main()\n\t{\n\t\t\tConsole.WriteLine(\"Hello\");\n\t}\n}"},
                                    {lang: "Clojure", type:"text/x-clojure", code: '(println "Hello")'},
                                    {lang: "Go", type:"text/x-go", code: "package main\nimport \"fmt\"\n\nfunc main(){\n  \n\tfmt.Printf(\"Hello\")\n}"},
                                    {lang: "Plain JavaScript", type:"text/javascript", code:  "//Not happy with Plain JS? Use JS/HTML/CSS option for using your own libraries.\n\nconsole.log(\"Hello\");"},
                                    {lang: "PHP", type:"text/x-php", code: "<?php\n$ho = fopen('php://stdout', \"w\");\n\nfwrite($ho, \"Hello\");\n\n\nfclose($ho);\n"},
                                    {lang: "Python", type:"text/x-python", code: "print \"Hello\""},
                                    {lang: "Ruby", type:"text/x-ruby", code: "puts \"Hello\""},
                                    {lang: "Bash", type:"text/x-bash", code: "echo 'Hi' "},
                                    {lang: "Objective-C", type:"text/x-objectivec", code: "#include <Foundation/Foundation.h>\n\n@interface Test\n+ (const char *) classStringValue;\n@end\n\n@implementation Test\n+ (const char *) classStringValue;\n{\n    return \"Hey!\";\n}\n@end\n\nint main(void)\n{\n    printf(\"%s\\n\", [Test classStringValue]);\n    return 0;\n}"},
                                    {lang: "Scala", type:"text/x-scala", code: "object HelloWorld {def main(args: Array[String]) = println(\"Hello\")}"},
                                    {lang: "VB.NET", type:"text/x-vb", code: "Imports System\n\nPublic Class Test\n\tPublic Shared Sub Main() \n    \tSystem.Console.WriteLine(\"Hello\")\n\tEnd Sub\nEnd Class"},
                                    {lang: "Rust", type:"text/rust", code: "fn main() {\n\tprintln!(\"Hello\");\n}"},
                                ];

                
        thisCtr.spCodeEditor.lang = thisCtr.listLanguages[2];  
        thisCtr.spCodeEditor.code = thisCtr.spCodeEditor.lang.code;      

        // The ui-ace option
        thisCtr.aceOption = {
                mode: thisCtr.spCodeEditor.lang.lang.toLowerCase(),
                    onLoad: function (_ace) {
                        // HACK to have the ace instance in the scope...
                        thisCtr.langChanged = function () {
                            thisCtr.spCodeEditor.code =  thisCtr.spCodeEditor.lang.code;                       
                            _ace.getSession().setMode('ace/mode/' + thisCtr.spCodeEditor.lang.lang.toLowerCase());
                        };

                    }
            };

            // Initial code content...
        

       
    }

/**
 *
 * Pass all functions into module
 */
angular.module('spide')
    .controller('MainController', ['$scope',MainControllerFun])    
})(window.angular);
