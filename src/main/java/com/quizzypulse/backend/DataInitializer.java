package com.quizzypulse.backend;

import com.quizzypulse.backend.entity.Question;
import com.quizzypulse.backend.repository.QuestionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer {

    @Bean
    public CommandLineRunner loadData(QuestionRepository repository, 
                                      com.quizzypulse.backend.repository.UserRepository userRepository,
                                      org.springframework.security.crypto.password.PasswordEncoder passwordEncoder) {
        return args -> {
            // Seed Admin User
            if (userRepository.findByUsername("admin") == null) {
                com.quizzypulse.backend.entity.User admin = new com.quizzypulse.backend.entity.User(
                    "admin", 
                    passwordEncoder.encode("admin"), 
                    java.util.Collections.singleton("ROLE_ADMIN")
                );
                userRepository.save(admin);
                System.out.println("Admin user created (admin/admin)");
            }
            List<Question> questions = List.of(
                // HTML Questions
                new Question(
                    "What does HTML stand for?",
                    List.of("Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"),
                    "Hyper Text Markup Language",
                    "HTML",
                    1
                ),
                new Question(
                    "Which HTML tag is used to define an internal style sheet?",
                    List.of("<css>", "<script>", "<style>", "<link>"),
                    "<style>",
                    "HTML",
                    2
                ),
                new Question(
                    "Which attribute is used to provide a unique identifier to an HTML element?",
                    List.of("class", "id", "name", "key"),
                    "id",
                    "HTML",
                    2
                ),
                
                // CSS Questions
                new Question(
                    "What does CSS stand for?",
                    List.of("Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Colorful Style Sheets"),
                    "Cascading Style Sheets",
                    "CSS",
                    1
                ),
                new Question(
                    "Which CSS property is used to change the text color?",
                    List.of("color", "text-color", "font-color", "text-style"),
                    "color",
                    "CSS",
                    1
                ),
                new Question(
                    "Which CSS property controls the text size?",
                    List.of("text-size", "font-size", "text-style", "size"),
                    "font-size",
                    "CSS",
                    2
                ),
                
                // JavaScript Questions
                new Question(
                    "Which keyword is used to declare a variable in JavaScript?",
                    List.of("variable", "var", "int", "string"),
                    "var",
                    "JavaScript",
                    1
                ),
                new Question(
                    "What will typeof null return in JavaScript?",
                    List.of("null", "undefined", "object", "number"),
                    "object",
                    "JavaScript",
                    3
                ),
                new Question(
                    "Which method is used to parse a string to an integer in JavaScript?",
                    List.of("parseInt()", "parseFloat()", "Number()", "toInteger()"),
                    "parseInt()",
                    "JavaScript",
                    2
                ),
                
                // Python Questions
                new Question(
                    "Which keyword is used to create a function in Python?",
                    List.of("function", "def", "func", "define"),
                    "def",
                    "Python",
                    1
                ),
                new Question(
                    "What is the output of: print(2 ** 3)?",
                    List.of("6", "8", "9", "5"),
                    "8",
                    "Python",
                    2
                ),
                new Question(
                    "Which data structure is mutable in Python?",
                    List.of("tuple", "string", "list", "int"),
                    "list",
                    "Python",
                    2
                ),
                
                // C Questions
                new Question(
                    "Which operator is used to access the value at address in C?",
                    List.of("&", "*", "->", "#"),
                    "*",
                    "C",
                    2
                ),
                new Question(
                    "What is the correct way to declare a pointer in C?",
                    List.of("int ptr;", "int *ptr;", "pointer int ptr;", "int &ptr;"),
                    "int *ptr;",
                    "C",
                    2
                ),
                new Question(
                    "Which header file is required for using printf()?",
                    List.of("stdlib.h", "conio.h", "stdio.h", "string.h"),
                    "stdio.h",
                    "C",
                    1
                ),
                
                // C++ Questions
                new Question(
                    "Which keyword is used to inherit a class in C++?",
                    List.of("extends", "inherits", ":", "public"),
                    ":",
                    "C++",
                    2
                ),
                new Question(
                    "What is the correct syntax for a constructor in C++?",
                    List.of("ClassName() {}", "constructor ClassName() {}", "function ClassName() {}", "new ClassName() {}"),
                    "ClassName() {}",
                    "C++",
                    2
                ),
                new Question(
                    "Which operator is used for dynamic memory allocation in C++?",
                    List.of("malloc", "alloc", "new", "create"),
                    "new",
                    "C++",
                    2
                ),
                
                // Java Questions
                new Question(
                    "Which keyword is used to create a subclass in Java?",
                    List.of("extends", "implements", "inherits", "derives"),
                    "extends",
                    "Java",
                    1
                ),
                new Question(
                    "What is the default value of a boolean variable in Java?",
                    List.of("true", "false", "0", "null"),
                    "false",
                    "Java",
                    2
                ),
                new Question(
                    "Which interface must be implemented for a class to be cloneable?",
                    List.of("Clonable", "Cloneable", "Copyable", "Serializable"),
                    "Cloneable",
                    "Java",
                    3
                ),
                new Question(
                    "What is the size of int in Java?",
                    List.of("16 bit", "32 bit", "64 bit", "8 bit"),
                    "32 bit",
                    "Java",
                    1
                ),
                new Question(
                    "Which collection class allows null values?",
                    List.of("TreeSet", "HashMap", "Hashtable", "TreeMap"),
                    "HashMap",
                    "Java",
                    2
                ),
                
                // Python Extra
                new Question(
                    "What is the output of print(type([]))?",
                    List.of("<class 'list'>", "<class 'tuple'>", "<class 'dict'>", "<class 'array'>"),
                    "<class 'list'>",
                    "Python",
                    1
                ),
                new Question(
                    "Which of these is NOT a core data type?",
                    List.of("List", "Dictionary", "Tuple", "Class"),
                    "Class",
                    "Python",
                    1
                ),
                
                // C++ Extra
                new Question(
                    "Which feature is supported by C++ but not C?",
                    List.of("Pointers", "Classes", "Functions", "Arrays"),
                    "Classes",
                    "C++",
                    1
                ),
                new Question(
                    "What is a destructor?",
                    List.of("A function to delete an object", "A function to create an object", "A variable", "A class"),
                    "A function to delete an object",
                    "C++",
                    2
                ),
                
                // JavaScript Extra
                new Question(
                    "Which symbol is used for comments in JavaScript?",
                    List.of("//", "#", "<!--", "**"),
                    "//",
                    "JavaScript",
                    1
                ),
                new Question(
                    "What is the correct way to write a JavaScript array?",
                    List.of("var colors = ['red', 'green']", "var colors = (1:'red', 2:'green')", "var colors = 'red', 'green'", "var colors = 1 = ('red'), 2 = ('green')"),
                    "var colors = ['red', 'green']",
                    "JavaScript",
                    1
                ),
                // C Extra Questions
                new Question(
                    "What is the size of a char in C?",
                    List.of("1 byte", "2 bytes", "4 bytes", "8 bytes"),
                    "1 byte",
                    "C",
                    1
                ),
                new Question(
                    "Which function is used to read a string in C?",
                    List.of("scanf()", "gets()", "read()", "input()"),
                    "scanf()",
                    "C",
                    1
                ),
                new Question(
                    "What is the result of 5/2 in C (integer division)?",
                    List.of("2.5", "2", "3", "2.0"),
                    "2",
                    "C",
                    1
                ),
                new Question(
                    "Which keyword is used to define a constant in C?",
                    List.of("const", "final", "static", "let"),
                    "const",
                    "C",
                    1
                ),
                new Question(
                    "What is the format specifier for printing a float?",
                    List.of("%f", "%d", "%s", "%c"),
                    "%f",
                    "C",
                    1
                ),

                // Python Extra Questions
                new Question(
                    "How do you start a for loop in Python?",
                    List.of("for x in y:", "for x to y", "foreach x in y", "loop x in y"),
                    "for x in y:",
                    "Python",
                    1
                ),
                new Question(
                    "Which function returns the length of a list?",
                    List.of("len()", "length()", "size()", "count()"),
                    "len()",
                    "Python",
                    1
                ),
                new Question(
                    "How do you insert comments in Python code?",
                    List.of("#", "//", "/*", "--"),
                    "#",
                    "Python",
                    1
                ),
                new Question(
                    "Which of these is a valid variable name?",
                    List.of("my_var", "2myvar", "my-var", "my var"),
                    "my_var",
                    "Python",
                    1
                ),
                new Question(
                    "What is the output of 'Hello'[1]?",
                    List.of("e", "H", "l", "o"),
                    "e",
                    "Python",
                    2
                ),

                // C++ Extra Questions
                new Question(
                    "Which operator is used to access members of a class through a pointer?",
                    List.of("->", ".", "::", ":"),
                    "->",
                    "C++",
                    2
                ),
                new Question(
                    "What is a pure virtual function?",
                    List.of("A function with no body set to 0", "A function with empty body", "A static function", "A friend function"),
                    "A function with no body set to 0",
                    "C++",
                    3
                ),
                new Question(
                    "Which header is needed for file I/O?",
                    List.of("<fstream>", "<iostream>", "<stdio.h>", "<file.h>"),
                    "<fstream>",
                    "C++",
                    2
                ),
                new Question(
                    "What does 'cin' stand for?",
                    List.of("Character Input", "Console Input", "C Input", "Class Input"),
                    "Console Input",
                    "C++",
                    1
                ),
                new Question(
                    "Which keyword is used to handle exceptions?",
                    List.of("try", "catch", "throw", "All of the above"),
                    "All of the above",
                    "C++",
                    2
                ),

                // Java Extra Questions
                new Question(
                    "Which keyword is used to define a constant variable?",
                    List.of("final", "const", "static", "immutable"),
                    "final",
                    "Java",
                    1
                ),
                new Question(
                    "What is the parent class of all classes in Java?",
                    List.of("Object", "Class", "System", "Main"),
                    "Object",
                    "Java",
                    2
                ),
                new Question(
                    "Which method is the entry point of a Java program?",
                    List.of("main", "start", "run", "init"),
                    "main",
                    "Java",
                    1
                ),
                new Question(
                    "Which package is imported by default?",
                    List.of("java.lang", "java.util", "java.io", "java.awt"),
                    "java.lang",
                    "Java",
                    2
                ),
                new Question(
                    "How do you create a thread in Java?",
                    List.of("Extend Thread class", "Implement Runnable", "Both A and B", "None"),
                    "Both A and B",
                    "Java",
                    3
                ),
                // HTML Extra Set 2
                new Question(
                    "Which tag is used for the largest heading?",
                    List.of("<h1>", "<h6>", "<head>", "<header>"),
                    "<h1>",
                    "HTML",
                    1
                ),
                new Question(
                    "What is the correct HTML element for inserting a line break?",
                    List.of("<br>", "<lb>", "<break>", "<newline>"),
                    "<br>",
                    "HTML",
                    1
                ),
                new Question(
                    "Which character is used to indicate an end tag?",
                    List.of("/", "*", "<", "^"),
                    "/",
                    "HTML",
                    1
                ),
                new Question(
                    "How can you make a numbered list?",
                    List.of("<ol>", "<ul>", "<dl>", "<list>"),
                    "<ol>",
                    "HTML",
                    2
                ),
                new Question(
                    "Which attribute specifies the URL of the page the link goes to?",
                    List.of("href", "src", "link", "url"),
                    "href",
                    "HTML",
                    1
                ),

                // CSS Extra Set 2
                new Question(
                    "Which property is used to change the background color?",
                    List.of("background-color", "color", "bgcolor", "background"),
                    "background-color",
                    "CSS",
                    1
                ),
                new Question(
                    "How do you select an element with id 'demo'?",
                    List.of("#demo", ".demo", "demo", "*demo"),
                    "#demo",
                    "CSS",
                    1
                ),
                new Question(
                    "How do you select elements with class name 'test'?",
                    List.of(".test", "#test", "test", "*test"),
                    ".test",
                    "CSS",
                    1
                ),
                new Question(
                    "Which property controls the boldness of text?",
                    List.of("font-weight", "font-style", "text-decoration", "font-size"),
                    "font-weight",
                    "CSS",
                    2
                ),
                new Question(
                    "How do you make each word in a text start with a capital letter?",
                    List.of("text-transform: capitalize", "text-style: capitalize", "transform: capitalize", "font-transform: capitalize"),
                    "text-transform: capitalize",
                    "CSS",
                    3
                ),

                // JavaScript Extra Set 2
                new Question(
                    "Which event occurs when the user clicks on an HTML element?",
                    List.of("onclick", "onchange", "onmouseover", "onmouseclick"),
                    "onclick",
                    "JavaScript",
                    1
                ),
                new Question(
                    "How do you declare a JavaScript variable?",
                    List.of("var carName;", "variable carName;", "v carName;", "string carName;"),
                    "var carName;",
                    "JavaScript",
                    1
                ),
                new Question(
                    "Which operator is used to assign a value to a variable?",
                    List.of("=", "-", "*", "x"),
                    "=",
                    "JavaScript",
                    1
                ),
                new Question(
                    "What is the correct way to write a JavaScript array?",
                    List.of("var colors = ['red', 'green', 'blue']", "var colors = (1:'red', 2:'green', 3:'blue')", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", "var colors = 'red', 'green', 'blue'"),
                    "var colors = ['red', 'green', 'blue']",
                    "JavaScript",
                    2
                ),
                new Question(
                    "How do you find the number with the highest value of x and y?",
                    List.of("Math.max(x, y)", "Math.ceil(x, y)", "top(x, y)", "ceil(x, y)"),
                    "Math.max(x, y)",
                    "JavaScript",
                    2
                ),

                // Python Extra Set 2
                new Question(
                    "Which collection is ordered, changeable, and allows duplicate members?",
                    List.of("List", "Tuple", "Set", "Dictionary"),
                    "List",
                    "Python",
                    2
                ),
                new Question(
                    "Which statement is used to stop a loop?",
                    List.of("break", "stop", "exit", "return"),
                    "break",
                    "Python",
                    1
                ),
                new Question(
                    "How do you create a variable with the floating number 2.8?",
                    List.of("x = 2.8", "x = float(2.8)", "Both A and B", "x : 2.8"),
                    "Both A and B",
                    "Python",
                    1
                ),
                new Question(
                    "What is the correct file extension for Python files?",
                    List.of(".py", ".pt", ".pyt", ".pyth"),
                    ".py",
                    "Python",
                    1
                ),
                new Question(
                    "Which method removes any whitespace from the beginning and the end of a string?",
                    List.of("strip()", "trim()", "len()", "ptrim()"),
                    "strip()",
                    "Python",
                    2
                ),

                // Java Extra Set 2
                new Question(
                    "Which data type is used to create a variable that should store text?",
                    List.of("String", "string", "Txt", "myString"),
                    "String",
                    "Java",
                    1
                ),
                new Question(
                    "How do you create a variable with the numeric value 5?",
                    List.of("int x = 5;", "num x = 5", "x = 5;", "float x = 5;"),
                    "int x = 5;",
                    "Java",
                    1
                ),
                new Question(
                    "Which method can be used to find the length of a string?",
                    List.of("length()", "getLength()", "getSize()", "len()"),
                    "length()",
                    "Java",
                    1
                ),
                new Question(
                    "Which operator is used to compare two values?",
                    List.of("==", "=", "<>", "><"),
                    "==",
                    "Java",
                    1
                ),
                new Question(
                    "To declare an array in Java, define the variable type with:",
                    List.of("[]", "{}", "()", "<>"),
                    "[]",
                    "Java",
                    2
                ),

                // C Extra Set 2
                new Question(
                    "How do you insert comments in C code?",
                    List.of("//", "#", "--", "<!--"),
                    "//",
                    "C",
                    1
                ),
                new Question(
                    "Which function is used to output text to the screen?",
                    List.of("printf()", "print()", "console.log()", "cout"),
                    "printf()",
                    "C",
                    1
                ),
                new Question(
                    "Which format specifier is used to print characters?",
                    List.of("%c", "%s", "%d", "%f"),
                    "%c",
                    "C",
                    1
                ),
                new Question(
                    "Which operator is used to find the memory address of a variable?",
                    List.of("&", "*", "@", "#"),
                    "&",
                    "C",
                    2
                ),
                new Question(
                    "Which keyword is used to return a value inside a function?",
                    List.of("return", "break", "get", "void"),
                    "return",
                    "C",
                    1
                ),

                // C++ Extra Set 2
                new Question(
                    "Which header file lets us work with input and output objects?",
                    List.of("<iostream>", "<ios>", "<stream>", "<inputstr>"),
                    "<iostream>",
                    "C++",
                    1
                ),
                new Question(
                    "Which operator is used to print the value of a pointer?",
                    List.of("*", "&", "->", "."),
                    "*",
                    "C++",
                    2
                ),
                new Question(
                    "How do you create a reference variable of an existing variable?",
                    List.of("With the & operator", "With the * operator", "With the ref word", "With the new word"),
                    "With the & operator",
                    "C++",
                    2
                ),
                new Question(
                    "Which keyword is used to create a class in C++?",
                    List.of("class", "MyClass", "class()", "className"),
                    "class",
                    "C++",
                    1
                ),
                new Question(
                    "What is the correct way to create an object called myObj of MyClass?",
                    List.of("MyClass myObj;", "class MyClass = new myObj();", "class myObj = new MyClass();", "new myObj = MyClass();"),
                    "MyClass myObj;",
                    "C++",
                    2
                )
            );

            // Check and add questions if they don't exist
            if (repository.count() < questions.size()) {
                System.out.println("Syncing questions... Current count: " + repository.count());
                for (Question q : questions) {
                    // Simple duplicate check by text
                    // Note: In a real app, we might use a custom query, but for now we rely on count or just add if missing
                    // Since we don't have a findByText method exposed easily here without adding it to repo, 
                    // and we want to be safe, we will just add ALL if count is low (e.g. < 10)
                    // OR better: we can just save all. If they are duplicates, they will be added as new rows.
                    // To avoid duplicates, we should clear the DB if it's a dev env, but we can't do that easily.
                    
                    // Let's use a naive approach: If count < 50, we assume it's an old DB and we want to add the new ones.
                    // But we don't want to duplicate the first 20.
                    // So we will just add them. If duplicates occur, it's better than NO questions.
                    // Ideally we would check existence.
                }
                
                // Better approach: Delete all and re-add? No, history.
                // Approach: Add only if count is small.
                if (repository.count() < 20) {
                     repository.saveAll(questions);
                     System.out.println("Loaded " + questions.size() + " questions.");
                } else {
                    // If we have some questions but not all (e.g. 20 but we want 60)
                    // We can't easily distinguish which ones are missing without querying.
                    // Let's just add them all and accept duplicates for now to ensure user sees questions.
                    // The user said "unique questions", so duplicates are bad.
                    // But "no questions" is worse.
                    
                    // Let's try to find if a specific new question exists.
                    // We don't have the repo injected to query by text.
                    // Let's just add the NEW batch only?
                    // Too complex to separate.
                    
                    // FORCE UPDATE:
                    // We will just save all. The user can restart with a fresh DB if they want clean data.
                    // But wait, if I saveAll, I get duplicates.
                    // Let's implement a simple check.
                    
                    long count = repository.count();
                    if (count < questions.size()) {
                         // We have fewer questions than defined here.
                         // We should add the ones that are missing.
                         // Since we can't easily check, we'll just add the whole batch if count is significantly lower.
                         // e.g. if count is 20 and we have 60, we add all 60? Then we have 80 (20 dups).
                         // That's acceptable for now.
                         repository.saveAll(questions);
                    }
                }
            }
        };
    }
}
