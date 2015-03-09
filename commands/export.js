'use strict';

var exec = require('child_process').exec,
    path = require('path'),
    gutil = require('gulp-util'),
    del = require('del');

module.exports = function (svnDir, exportDir, cb) {

        del([
            exportDir + '/**',
            exportDir
        ]);

    
        var cmd = 'svn export -r COMMITTED '+ svnDir +' '+ exportDir;


        return exec(cmd, function(err, stdout, stderr){
            if(err) return cb(err);
             
            gutil.log(cmd + ' (log : false)', stderr);
           
            cb(err, stdout);
        });

 
    
};