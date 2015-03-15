'use strict';

var exec = require('child_process').exec,
    gutil = require('gulp-util'),
    fs = require('fs'),
    path = require('path'),
    readlineSync = require('readline-sync');

module.exports = function (svnDir, cb) {

    var dir = path.join(process.cwd(), 'svnconf.json');
    
    if(!cb || typeof cb !== 'function') cb = function() {};
 
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

    var message = readlineSync.question('? Your commit message'.cyan + ': ');

    var cmd = 'svn commit -m "' + message + '" ';

    if(svnUser && svnPass) {
        cmd += ' --username '+ svnUser + ' --password ' + svnPass;
    }

    return exec(cmd, {cwd: svnDir}, function(err, stdout, stderr){
        if (err) return cb(err);
        gutil.log(stdout, stderr);
        cb();
    });
};