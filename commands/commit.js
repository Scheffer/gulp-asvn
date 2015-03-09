'use strict';

var exec = require('child_process').exec,
    readlineSync = require('readline-sync'),
    gutil = require('gulp-util');

module.exports = function (svnDir, options, cb) {

    if(!cb && typeof options === 'function') {
        cb = options;
        options = {};
    }

    var message = readlineSync.question('? Your Scommit message'.cyan + ': ');

    if(!cb || typeof cb !== 'function') cb = function() {};
    if(!options) options = {};
    if(!message) throw new Error('gulp-svn: Message is required svn.commit("Initial commit")');
    if(!options.cwd) options.cwd = process.cwd();
    if(!options.args) options.args = ' ';

    var cmd = 'svn commit -m "' + message + '" ' + options.args;

    if(options.username && options.password) {
        cmd += ' --username '+ options.username + ' --password ' + options.password;
    }

    return exec(cmd, {cwd: svnDir}, function(err, stdout, stderr){
        if (err) return cb(err);
        if (!options.quiet) gutil.log(stdout, stderr);
        cb();
    });
};