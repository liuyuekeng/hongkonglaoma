var exec = require('child_process').exec,
    path = require('path'),
    fs = require('fs')

var less_dir = path.join(__dirname, "less_src", "login.less");
var css_dir = path.join(__dirname, "statics/css", "login.css");

var jsx_dir = path.join(__dirname, "jsx_src");



function compile_less (input_file, output_file) {
    var cmd = ['lessc ', input_file, ' > ', output_file].join('');
    exec(cmd, {encoding: 'utf-8'}, 
        function(error, stdout, stderr) {
            if(error !== null) {
                console.log(error);
                return;
            }
            console.log(stdout);
        });
}

function compile_jsx () {
    exec('sh jsx_build.sh', {encoding: 'utf-8'},
        function(error, stdout, stderr) {
            if(error !== null) {
                console.log(error);
                return;
            }
            console.log(stdout);
        });
}

console.log('compile ' + less_dir + ' once...');
compile_less(less_dir, css_dir);
console.log('compile jsx once...');
//compile_jsx();

console.log('watching less files ...');
fs.watchFile(less_dir, { 
        persistent: true, 
        interval: 1000 // 1 sec
    }, 
    function(curr, prev) {
        console.log('the less file changed, compile ...');
        compile_less(less_dir, css_dir);
    });
/*
console.log('watching jsx files ...');
fs.watch(jsx_dir, {
        persistent: true,
        recursive: true
    }, function (event, filename) {
        console.log('the jsx file change, compile ...');
        console.log(event, filename);
    });
*/
