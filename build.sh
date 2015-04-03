echo '========================jsx start==============================='
jsx jsx_src/ statics/js
echo '========================jsx end================================='
echo '========================rjs start==============================='
node node_modules/requirejs/bin/r.js -o conf/rjs_login_conf.js optimize=none
node node_modules/requirejs/bin/r.js -o conf/rjs_article_content_conf.js optimize=none
node node_modules/requirejs/bin/r.js -o conf/rjs_article_conf.js optimize=none
echo '========================rjs end================================='
