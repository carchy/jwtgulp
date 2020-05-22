let gulp = require('gulp')
let uglify = require('gulp-uglify')
let concat = require('gulp-concat')
let sourcemaps = require('gulp-sourcemaps')
let pump = require('pump')
let ts = require('gulp-typescript')
let cln = require('gulp-clean')
function clone(src, jsname, jsPath, dst, cnf) {
  let fret=function()
  {
    let src =this.src
    let dst=this.dstPath
    console.log('开始clone路径')
    console.log('源路径: '+src)
    console.log('目的路径:'+dst)
   return  gulp.src(src)
    .pipe(gulp.dest(dst))
  }
  return fret
}
module.exports = clone