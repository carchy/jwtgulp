"use strict";
//把ts 文件编译为js文件
let setting = require('./setting')
let gulp = require('gulp');
let pump = require('pump');
let ts = require('gulp-typescript');
let sourcemaps = require('gulp-sourcemaps')
let uglify = require('gulp-uglify')
let concat = require('gulp-concat')
let plumber = require('gulp-plumber')
function rxmPackageJsTask() {
    //src: Array<string>
    //dstJsName: string
    //dstPath: string
    const _conf = {
        "target": "es5",
        "module": "amd",
        "alwaysStrict": false,
        "allowJs": true,
        "outDir": "ztempCompile",
        "noImplicitUseStrict": true,
        "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    };
    
    let fret = function () {
        let version=this.version || setting.version || '1.0.0'
        let src = this.src
        let dst = this.dstPath
        /**@type  {String} */
        let jsname = this.fileName
        if(jsname)
        {
            jsname=jsname.replace('[version]',version)
        }
        console.info('ts and js jion  compress and ugly')
        console.info('source path: ' + src)
        console.info('destination path' + dst);
        console.info('destination file' + jsname);
        let cf = Object.assign({}, this.tsconfig,_conf);
        this.excludejs&&(cf.allowJs=false)
        let tsProject = ts.createProject(cf)
        let srcMap=setting.debug?".pipe(sourcemaps.init())":""
        let cnt=jsname?".pipe(concat(jsname))":''
        let ugly=setting.debug?
        `.pipe(uglify({
           mangle: true,
           compress: true,
           
        }))
       .pipe(sourcemaps.write('.'))`:
       `.pipe(uglify({
            mangle: true,
            compress: true,
        }))`
        let  sgulp=` gulp.src(src)
                .pipe(plumber())
                .pipe(tsProject())
                ${srcMap}
                ${cnt}
                ${ugly}
                .pipe(plumber.stop())
                .pipe(gulp.dest(dst))
                `
        let  ret= eval (sgulp)
        //
        return ret;
    }
    return fret

}
module.exports= rxmPackageJsTask;

