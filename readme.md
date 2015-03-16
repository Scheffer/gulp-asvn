# gulp-asvn

> Gulp plugin to work with svn

[![NPM](https://nodei.co/npm/gulp-asvn.png?downloads=true)](https://www.npmjs.com/package/gulp-asvn/)

###Preinstall

This isn't a full **SVN** solution, it's only a interface to work on [gulp.js](http://gulpjs.com/) whit **SVN**. If you have not installed a client svn, you need install one.

[Here](https://subversion.apache.org/packages.html) find the respective client for your OS with install instructions: [Apache Subversion Binary Packages.](https://subversion.apache.org/packages.html)


## Install

```
$ npm install --save-dev gulp-asvn
```


## Usage

```js
var gulp = require('gulp');
var svn  = require('gulp-asvn');

var svnConf = {
	svnDir :'./app',
	destDir : './export',
}

gulp.task('checkout', function() {
    	return svn.checkout (svnConf.svnDir, function(err){
		    	if(err) throw err;
	});
});

gulp.task('add', function() {
     	return svn.add (svnConf.svnDir, function(err){
		    	if(err) throw err;
	});
});

gulp.task('export', function() {
     	return svn.export(svnConf.svnDir, svnConf.destDir, function(err){
		    	if(err) throw err;
	});
});

gulp.task('commit', function() {
     	return svn.commit (svnConf.svnDir, function(err){
		    	if(err) throw err;
	});
});



```

## Run Gulp Tasks

```
$ gulp checkout
```

```
$ gulp add
```

```
$ gulp export
```

```
$ gulp commit
```


## License

MIT. See [LICENSE.md](https://github.com/Scheffer/gulp-asvn/blob/master/LICENSE.md) for details.
