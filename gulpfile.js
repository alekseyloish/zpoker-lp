const gulp 		 	= require('gulp'),
	  svgmin		= require('gulp-svgmin'),
	  sass		 	= require('gulp-sass'),
	  sassimporter 	= require('sass-module-importer'),
	  prefixer	 	= require('gulp-autoprefixer'),
	  minify 		= require("gulp-babel-minify"),
	  sourcemaps	= require('gulp-sourcemaps'),
	  rigger		= require('gulp-rigger'),
	  cleanCSS		= require('gulp-clean-css'),
	  svgSprite 	= require('gulp-svg-sprite'),
	  rollup 		= require('gulp-better-rollup'),
	  babel 		= require('rollup-plugin-babel'),
	  resolve 		= require('rollup-plugin-node-resolve'),
	  commonjs 		= require('rollup-plugin-commonjs');

sass.compiler = require('node-sass');

const path = {
	app: {
		html: 'app/',
		js:   'app/js/',
		css:  'app/css/',
		img:  'app/images/',
		svg:  'app/images/svg',
		icons:'app/images/icons'
	},
	src: {
		html: 'src/*.html',
		js:   'src/js/app.js',
		css:  'src/sass/app.scss',
		img:  'src/images/*.*',
		svg:  'src/images/svg/*.svg',
		icons:'src/images/icons/*.svg'
	},
	watch: {
		html: 'src/**/*.html',
		js:   'src/js/**/*.js',
		css:  'src/sass/**/*.scss',
		img:  'src/images/*.*',
		svg:  'src/images/svg/*.svg',
		icons:'src/images/icons/*.svg'
	},
	clean: './app'
};

function html(){
	return gulp
		.src(path.src.html)
		.pipe(rigger())
		.pipe(gulp.dest(path.app.html))
}
function images(){
	return gulp
		.src(path.src.img)
		.pipe(gulp.dest(path.app.img));
}
function svg(){
	return gulp
		.src(path.src.svg)
		.pipe(svgmin())
		.pipe(gulp.dest(path.app.svg));
}
function icons(){
	return gulp
		.src(path.src.icons)
		.pipe(svgmin())
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: '../icons.svg'
				}
			}
		}))
		.pipe(gulp.dest(path.app.icons));
}
function scripts(){
	return gulp
		.src(path.src.js)
		.pipe(rollup({ 
			plugins: [babel(), resolve(), commonjs()]
		}, 'umd'))
		//.pipe(sourcemaps.init({loadMaps: true}))
		//.pipe(minify({mangle: {keepClassName: true}}))
		//.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.app.js));
}
function css(){
	return gulp
		.src(path.src.css)
		//.pipe(sourcemaps.init())
		.pipe(sass({importer: sassimporter()}))
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(prefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(cleanCSS({level: {1: {specialComments: 0}}}))
		//.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.app.css));
}
function build(){
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.img, images);
	gulp.watch(path.watch.svg, svg);
	gulp.watch(path.watch.icons, icons);
	gulp.watch(path.watch.js, scripts);
	gulp.watch(path.watch.css, css);
}

const watch = gulp.series(html, images, svg, icons, css, scripts, build);

gulp.task('watch', watch);