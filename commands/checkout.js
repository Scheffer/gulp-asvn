'use strict';

var exec = require('child_process').exec,
    gutil = require('gulp-util');
    var readlineSync = require('readline-sync');

module.exports = function (path, cb)
{

        var ops = {
            color: 'green',
            format: false,
            validate: function(input) { return input; }
        }
        var repo = readlineSync.question('? Your SVN Repo URL'.cyan + ': ');
        var user = readlineSync.question('? Your SVN User'.cyan + ': ');
        var password = readlineSync.question('? Your SVN Password'.cyan + ': ', {noEchoBack: true});

        var svnRepo = repo;
        var svnUser = user;
        var svnPass = password;
        var cmd = 'svn checkout ' + svnRepo + ' ' + path;
        cmd += ' --username '+ svnUser + ' --password ' + svnPass;
        

        return exec(cmd, function(err, stdout, stderr){
            if (err) return cb(err);
            gutil.log(stdout, stderr);
            cb();
        });


};