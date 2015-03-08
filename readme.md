# gulp-asvn 

> My gnarly gulp plugin


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
```

## Run Gulp task

```
$ gulp checkout
```

Lorem ipsum.


## License

MIT © [](https://github.com/Scheffer)
