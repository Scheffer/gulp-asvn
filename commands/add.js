'use strict';

var exec = require('child_process').exec,
    gutil = require('gulp-util'),
    fs = require('fs'),
    path = require('path'),
    readlineSync = require('readline-sync');

module.exports = function (repoDir, cb) {

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

    var cmd = "svn st | grep ? | tr -s ' ' | cut -d ' ' -f 2 | xargs svn add";

    if(svnUser && svnPass) {
        cmd += ' --username '+ svnUser+ ' --password ' + svnPass;
    }

    return exec(cmd, {cwd: repoDir}, function(err, stdout, stderr){
        if (err) return cb(err);
        gutil.log(stdout, stderr);
        cb();
    });
};