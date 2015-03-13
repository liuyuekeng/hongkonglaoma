echo '========================jsx start==============================='
jsx jsx_src/ statics/js
echo '========================jsx end================================='
echo '========================rjs start==============================='
node node_modules/requirejs/bin/r.js -o conf/rjs_conf.js optimize=none
echo '========================rjs end================================='
