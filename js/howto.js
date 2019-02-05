var source = $("../views/commands.handlebars").html(); 
var template = Handlebars.compile(source); 

var data = { 
    commands: [ { 
        input: {
            command: "thisweekhw"
        },
        whatToType: "/thisweekhw",
        whatItDoes: "Display's current weeks assignment details" 
    }, {
        input: {
            command: "yoMamaJoke"
        }, 
        whatToType: "/yoMamaJoke",
        whatItDoes: "Display's a \"yo mama joke \" from their API"
    } ]
}; 

Handlebars.registerHelper('command', function(input) {
  return input.command
});

$('body').append(template(data));