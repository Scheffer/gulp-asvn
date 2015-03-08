# gulp-asvn 

> My gnarly gulp plugin


## Install

```
$ npm install --save-dev gulp-asvn
```


## Usage

```js
var gulp = require('gulp');
var svn = require('gulp-asvn');

gulp.task('default', function () {
	return gulp.src('src/file.ext')
		.pipe(gulAsvn())
		.pipe(gulp.dest('dist'));
});
```


## API

### Asvn(options)

#### options

##### foo

Type: `boolean`  
Default: `false`

Lorem ipsum.


## License

MIT © [](https://github.com/Scheffer)
