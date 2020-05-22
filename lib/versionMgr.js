"use strict";
let ts = require('gulp-typescript');
let plumber = require('gulp-plumber');
let gulp = require('gulp')
let setting=require('./rxmPackageSetting')
//没有做忽略
let versionMgr = function () {
  //runSequence.options.ignoreUndefinedTasks = true;
  function cmmnversion() {
    let _conf = {
      "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */
      "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
      //"allowJs": true,                       /* Allow javascript files to be compiled. */
      //outFile: 'version.js',                         /* Redirect output structure to the directory. */
      outDir: 'zcompile/version',
      "strict": true,                           /* Enable all strict type-checking options. */
      "esModuleInterop": true,                  /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    }
    let tsProject = ts.createProject(_conf)
    //console.info(parm.nodedst)
    let path=__dirname+'/tmp'
   // console.info(path)
    return gulp.src('_edit/_version/version.ts')
      .pipe(plumber())
      .pipe(tsProject())
      .pipe(plumber.stop())
    
      .pipe(gulp.dest(path))
  }

  function vrsn() {
    let path=__dirname+'/tmp'
    //console.info(path)
   let v= require(path+'/version')()
    setting({version: v.v})
    return gulp.src(path+'/version.js')
      
  }
  function vrsnAmd() {

    console.log('本次编译版本：' + setting().version)
    let _amdcf = {
      "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */
      "module": "amd",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
      "allowJs": true,                       /* Allow javascript files to be compiled. */
      //outFile: 'version.js',                         /* Redirect output structure to the directory. */
      outDir: './_edit/rxmcbgn/js',
      "strict": true,                           /* Enable all strict type-checking options. */
      "esModuleInterop": true,                  /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */

    }
    let  dst='_edit/rxmcbgn/js';
    (typeof  this.dst!='undefined')&&( dst=this.dst)
    console.info('version path'+dst+this)
    let tsProject = ts.createProject(_amdcf)
    return gulp.src(['_edit/_version/version.ts'])
      .pipe(plumber())
      .pipe(tsProject())
      .pipe(plumber.stop())
      .pipe(gulp.dest(dst))

  }
  return {
    cmmnjsVersion:cmmnversion,
    parseVersion:vrsn,
    amdjsVersion:vrsnAmd
  }

  // gulp.task('cmmnversion'+name, cmmnversion)
  // gulp.task('vrsn'+name, vrsn)
  // gulp.task(name,gulp.series('cmmnversion'+name,'vrsn'+name),vrsnAmd)

}
module.exports = versionMgr;
