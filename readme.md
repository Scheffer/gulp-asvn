# gulp-asvn 

[![NPM](https://nodei.co/npm/gulp-asvn.png?compact=true)](https://nodei.co/npm/gulp-asvn/)

> Gulp plugin to work with svn


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


## License

MIT © [](https://github.com/Scheffer)
