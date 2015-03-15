'use strict';

var exec = require('child_process').exec,
    path = require('path'),
    gutil = require('gulp-util'),
    fs = require('fs'),
    del = require('del'),
    readlineSync = require('readline-sync');

module.exports = function (svnDir, exportDir, cb) {

        del([
            exportDir + '/**',
            exportDir
        ]);

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

        var cmd = 'svn export -r COMMITTED '+ svnDir +' '+ exportDir;

        if(svnUser && svnPass) {
            cmd += ' --username '+ svnUser+ ' --password ' + svnPass;
        }

        return exec(cmd, function(err, stdout, stderr){
            if(err) return cb(err);            
            gutil.log(stdout, stderr);          
            cb(err, stdout);
        });
   
};