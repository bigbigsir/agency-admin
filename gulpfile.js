const fs = require('fs')
const del = require('del')
const gulp = require('gulp')
const htmlMin = require('gulp-htmlmin')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const vinylPaths = require('vinyl-paths')

// 压缩html
function minifyHtml (cb) {
  return gulp.src('build/**/*.html')
    .pipe(htmlMin({
      minifyJS: true,
      minifyCSS: true,
      removeComments: true,
      collapseWhitespace: true,
      removeEmptyAttributes: true,
      collapseBooleanAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true
    }))
    .pipe(gulp.dest('build'))
    .on('end', cb)
    .on('error', err => {
      console.log(err)
    })
}

// 压缩以及编译public目录里面的js
function minifyJs (cb) {
  const paths = [
    'build/**/*.js',
    '!build/static/**/*.js'
  ]
  return gulp.src(paths)
    .pipe(babel({
      babelrc: false,
      configFile: false,
      presets: [[
        '@babel/preset-env',
        {
          targets: '> 0.25%, not dead'
        }
      ]]
    }))
    .pipe(uglify({
      compress: {
        drop_console: true, // 过滤 console
        drop_debugger: true // 过滤 debugger
      }
    }))
    .pipe(gulp.dest('build'))
    .on('end', cb)
    .on('error', err => {
      console.log(err)
    })
}

// 压缩以及编译public目录里面的js
function minifyIndexJs (cb) {
  return gulp.src('./public/index.js')
    .pipe(babel({
      babelrc: false,
      configFile: false,
      presets: [[
        '@babel/preset-env',
        {
          targets: {
            ie: '9'
          }
        }
      ]]
    }))
    .pipe(uglify({
      compress: {
        drop_console: true, // 过滤 console
        drop_debugger: true // 过滤 debugger
      }
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./build'))
    .on('end', cb)
    .on('error', err => {
      console.log(err)
    })
}

// 把index.js注入到index.html中
function copyJsToHtml (cb) {
  const js = fs.readFileSync('build/index.min.js', 'utf8')
  const html = fs.readFileSync('build/index.html', 'utf8')
  const result = html.replace(/( ?)src=".*\/index.js">/, '>' + js)
  fs.writeFileSync('build/index.html', result)
  cb()
}

// 删除打包后，残余文件
function removeAfterBuildingUnusedFile (cb) {
  const path = [
    'build/*.ejs',
    'build/index.js',
    'build/index.min.js'
  ]
  return gulp.src(path, { allowEmpty: true })
    .pipe(vinylPaths(del))
    .on('end', cb)
    .on('error', err => {
      console.log(err)
    })
}

gulp.task('minifyHtml', minifyHtml)
gulp.task('minifyJs', minifyJs)
gulp.task('copyJsToHtml', copyJsToHtml)
gulp.task('removeAfterBuildingUnusedFile', removeAfterBuildingUnusedFile)
gulp.task('minifyIndexJs', minifyIndexJs)
gulp.task('minify', gulp.series(/* minifyIndexJs, copyJsToHtml,  */removeAfterBuildingUnusedFile), cb => cb())

// gulp.series：按照顺序执行replaceCDNPath, minifyHtml,
// gulp.parallel：可以并行计算
