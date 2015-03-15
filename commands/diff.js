'use strict';

var exec = require('child_process').exec,
    gutil = require('gulp-util'),
    fs = require('fs'),
    path = require('path'),
    readlineSync = require('readline-sync');

module.exports = function (file, options, cb) {

    var dir = path.join(process.cwd(), 'svnconf.json');
 
    if (fs.existsSync(dir)) {

        var svnConf = require(dir);
        var svnUser = svnConf.user;
        var svnPass = svnConf.password;
        
    } else {

        var user = readlineSync.question('? Your SVN User'.cyan + ': ');
        var password = readlineSync.question('? Your SVN Password'.cyan + ': ');

        var svnUser = user;
        var svnPass = password;
    }

    if(!cb && typeof options === 'function') {
        cb = options;
        options = {};
    }

    if(!cb || typeof cb !== 'function') cb = function() {};
    if(!options) options = {};
    if(!file) throw new Error('gulp-svn: File is required svn.diff("file.js")');
    if(!options.cwd) options.cwd = process.cwd();
    if(!options.args) options.args = ' ';

    var cmd = 'svn diff ' + file + ' ' + options.args;

    if(svnUser && svnPass) {
        cmd += ' --username '+ svnUser+ ' --password ' + svnPass;
    }

    return exec(cmd, {cwd: options.cwd}, function(err, stdout, stderr){
        if (err) return cb(err);
        gutil.log(stdout, stderr);
        cb();
    });
};