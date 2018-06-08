var os = require('os');
var EventEmitter = require("events").EventEmitter;
var OSinfo = require('./modules/OSinfo');
var colors = require('colors');

var emitter = new EventEmitter();
emitter.on("beforeCommand", function (instruction) {
    console.log('You wrote: ' + instruction + ', trying to run command');
});
emitter.on("afterCommand", function () {
    console.log('Finished command');
});

process.stdin.setEncoding('utf-8');

process.stdin.on('readable', function() {
    // metoda .read() ma za zadanie odczytać co użytkownik podał na wejściu
    var input = process.stdin.read();
    if (input !== null) {
        var instruction = input.toString().trim(); //trim pozbywa się białych znaków
		// odpalanie zdarzenia beforeCommand (z parametrem)
        emitter.emit('beforeCommand', instruction);
		switch (instruction) {
			case '/exit': 
				process.stdout.write('Quitting app!\n');
            	process.exit();
				break;
			case '/help': 
				console.log('wpisz: /exit, /info, /sayhello, /getOSinfo, ...');
				break;
			case '/info':
				console.log('Język: ' + process.env.LANG + ', wersja: '+ process.versions.node);
				break;
			case '/sayhello':
                process.stdout.write('hello!\n');
                break;
			case '/getOSinfo':
				process.stdout.write('Info o systemie: \n');
				OSinfo.print();
				break;
			default: 
				process.stderr.write('Wrong instruction! \n');
		}
		// emitowanie zdarzenia afterCommand (bez parametru)
        emitter.emit('afterCommand');
    }
});

