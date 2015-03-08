'use strict';

var exec = require('child_process').exec,
    prompt = require('synchro-prompt'),
    gutil = require('gulp-util');

module.exports = function (path, cb)
{


        var ops = {
            color: 'green',
            format: false,
            validate: function(input) { return input; }
        }
        var answer = prompt(['SVN Repo URL: ', 'SVN Username: ', 'SVN Password: '], ops);

        //console.log(answer);
       
        var svnRepo = answer[0];
        var svnUser = answer[1];
        var svnPass = answer[2];
        var cmd = 'svn checkout ' + svnRepo + ' ' + path;
        cmd += ' --username '+ svnUser + ' --password ' + svnPass;
        

        return exec(cmd, function(err, stdout, stderr){
            if (err) return cb(err);
            gutil.log(stdout, stderr);
            cb();
        });


};