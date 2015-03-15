'use strict';

var exec = require('child_process').exec,
    gutil = require('gulp-util'),
    fs = require('fs'),
    path = require('path'),
    readlineSync = require('readline-sync');

module.exports = function (destDir, cb)
{

    var dir = path.join(process.cwd(), 'svnconf.json');
    var gitfile = path.join(process.cwd(), '.gitignore');

    var svnFile = function (callback) {
       
        if (fs.existsSync(dir)) {

            var svnConf = require(dir);
            var svnRepo = svnConf.repo;
            var svnUser = svnConf.user;
            var svnPass = svnConf.password;
        
        } else {
           
            var repo = readlineSync.question('? Your SVN Repo URL'.cyan + ': ');
            var user = readlineSync.question('? Your SVN User'.cyan + ': ');
            var password = readlineSync.question('? Your SVN Password'.cyan + ': ');

            var configSvn = '{ "repo" : "' + repo + '", "user" : "' + user + '", "password" : "' + password + '" }';
           
            var svnConfigFile = fs.writeFile(dir, configSvn, function(err) {
                if(err) throw err;

            });

            if (fs.existsSync(gitfile)) {
                
                var array = [];
                
                fs.readFile(gitfile, 'utf8', function(err, data) {
                    if(err) throw err;

                    var svntext = data;
                    array = data.toString().split("\n");

                    if (array.indexOf(".svn") == -1) {

                        var svnign = "\n.svn";
                        svntext = svntext + svnign;

                    };

                    if (array.indexOf("svnconf.json") == -1) {

                        var svnconfign = "\nsvnconf.json";
                        svntext = svntext + svnconfign;

                    };
                        
                    fs.writeFile (gitfile, svntext, function(err) {
                        if (err) throw err;
                    });                     
                        
                });
            
            } else {

                fs.writeFile(gitfile, ".svn\nsvnconf.json", function(err) {
                    if(err) throw err;
                });

            }

            var svnRepo = repo;
            var svnUser = user;
            var svnPass = password;


        }

        var cmd = 'svn checkout ' + svnRepo + ' ' + destDir;
        cmd += ' --username '+ svnUser + ' --password ' + svnPass;
        
        return exec(cmd, function(err, stdout, stderr){           
            if (err) return cb(err);
            gutil.log(stdout, stderr);
            cb();
        });

    }   
    
    return svnFile(cb);

};