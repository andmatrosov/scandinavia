const gulp = require('gulp'),
  watch = require('gulp-watch'),
  autoprefixer = require('autoprefixer'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  rimraf = require('rimraf'),
  browserSync = require('browser-sync').create(),
  plumber = require('gulp-plumber'),
  notify = require('gulp-notify'),
  newer = require('gulp-newer'),
  postcss = require('gulp-postcss'),
  cssnano = require('cssnano'),
  // Images
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  //HTML,CSS,JS
  svgmin = require('gulp-svgmin'),
  cheerio = require('gulp-cheerio'),
  replace = require('gulp-replace'),
  svgSprite = require('gulp-svgsprite'),
  rename = require('gulp-rename'),
  cleancss = require('clean-css'),
  // HTML, CSS, JS
  terser = require('gulp-terser'),
  reload = browserSync.reload;

const path = {
  dist: {
    //Тут мы укажем куда складывать готовые после сборки файлы
    html: 'dist/',
    script: 'dist/js/',
    css: 'dist/css/',
    img: 'dist/img/',
    svg: 'dist/img/svg',
    fonts: 'dist/fonts/',
  },
  src: {
    //Пути откуда брать исходники
    html: 'src/*.html',
    script: 'src/js/*.js',
    style: 'src/scss/**/*.+(scss|sass)',
    img: 'src/img/**/**.*',
    svg: 'src/img/svg/**/*.svg',
    fonts: 'src/fonts/**/*.*',
  },
  watch: {
    //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
    html: 'src/**/*.html',
    scripts: 'src/js/**/*.js',
    style: 'src/scss/**/*.*',
    img: 'src/img/**/*.*',
    svg: 'src/svg/**/*.*',
    fonts: 'src/fonts/**/*.*',
  },
  clean: './build',
};

const config = {
  server: {
    baseDir: 'dist/',
  },
  // tunnel: true,
  // host: 'localhost',
  // port: 9000,
  logPrefix: 'Front-End',
};

function html(cb) {
  gulp
    .src(path.src.html) //Выберем файлы по нужному пути
    .pipe(gulp.dest(path.dist.html)) //Выплюнем их в папку build
    .pipe(
      reload({
        stream: true,
      })
    ); //И перезагрузим наш сервер для обновлений\
  cb();
}

function js(cb) {
  return gulp
    .src(path.src.script) //Найдем наш main файл // Собираем их в кучу в новом файле libs.min.js
    /* return gulp.src([ // Берем все необходимые библиотеки
		'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
		])
		.pipe(concat('libs.min.js')) */ .pipe(
      plumber()
    )
    .pipe(sourcemaps.init()) //Инициализируем sourcemap
    // .pipe(concat('main.js'))
    .pipe(sourcemaps.write()) //Пропишем карты
    .pipe(terser()) //Сжатие JS
    .pipe(gulp.dest(path.dist.script)) //Выплюнем готовый файл в build
    .pipe(
      reload({
        stream: true,
      })
    );
  //И перезагрузим сервер
  cb();
}

function style(cb) {
  gulp
    .src(path.src.style, {
      sourcemaps: true,
    }) //Выберем наш main.scss
    .pipe(concat('main.**'))
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>'),
      })
    )
    .pipe(sourcemaps.init()) //То же самое что и с js
    .pipe(sass())
    .pipe(
      postcss([
        autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
          cascade: true,
        }),
        cssnano(),
      ])
    )
    //    .pipe(cleancss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dist.css)) //И в build
    .pipe(
      reload({
        stream: true,
      })
    );
  cb();
}

function image(cb) {
  gulp
    .src(path.src.img) //Выберем наши картинки
    .pipe(newer(path.dist.img))
    .pipe(
      imagemin({
        interlaced: true,
        progressive: true,
        use: [pngquant()],
        optimizationLevel: 5,
        svgoPlugins: [
          {
            removeViewBox: false,
          },
        ],
      })
    )
    .pipe(gulp.dest(path.dist.img)) //И бросим в build
    .pipe(
      reload({
        stream: true,
      })
    );
  cb();
}

function fonts(cb) {
  gulp
    .src(path.src.fonts)
    .pipe(newer(path.dist.fonts))
    .pipe(gulp.dest(path.dist.fonts))
    .pipe(
      reload({
        stream: true,
      })
    );
  cb();
}

function svg(cb) {
  return gulp
    .src(path.src.svg)
    .pipe(newer(path.dist.svg))
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {
          xmlMode: true,
        },
      })
    )
    .pipe(replace('&gt;', '>'))
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: 'sprite.svg',
          },
        },
      })
    )
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(path.dist.svg));
  cb();
}

function watchfiles(done) {
  browserSync.init(config);

  // html changes
  gulp.watch(path.src.html, html);
  // image changes
  gulp.watch(path.src.img, image);
  // js changes
  gulp.watch(path.src.script, js);
  //svg changes
  gulp.watch(path.src.svg, svg);
  // CSS changes
  gulp.watch(path.src.style, style);
  // fonts changes
  gulp.watch(path.src.fonts, fonts);
  done();
}

function clean(cb) {
  rimraf('dist/**', cb);
}
exports.html = html;
exports.css = style;
exports.js = js;
exports.svg = svg;
exports.img = image;
exports.fonts = fonts;
exports.watch = watchfiles;
exports.clean = clean;
gulp.task(
  'default',
  gulp.series(gulp.parallel(style, js, html, fonts, image, svg), watchfiles)
);
