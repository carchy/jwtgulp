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
        "allowJs": true,
        "outDir": "ztempCompile",
        "strict": false,
        "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    };
    const  version  ='1.0.0'
    let fret = function () {
        let version=setting.version
        let src = this.src
        let dst = this.dstPath
        /**@type  {String} */
        let jsname = this.dstJsName
        if(jsname)
        {
            jsname=jsname.replace('[version]',version)
        }
        console.info('ts和js合并压缩混淆')
        console.info('源路径: ' + src)
        console.info('目的路径' + dst);
        (jsname.lastIndexOf('.js') !== jsname.length - 3) && (jsname = jsname + '_' + setting().version + '.js')
        console.info('目标文件' + jsname);
        let cf = Object.assign({}, _conf);
        let tsProject = ts.createProject(cf)
        let cnt=jsname?".pipe(concat(jsname))":''
        let ugly=`.pipe(uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
            compress: true,//类型：Boolean 默认：true 是否完全压缩
        }))`
        let  sgulp=`return gulp.src(src)
                .pipe(plumber())
                .pipe(tsProject())
                ${cnt}${ugly}
                .pipe(plumber.stop())
                .pipe(gulp.dest(dst))
                `
        eval (sgulp)
           
    }
    return fret

}
export  default rxmPackageJsTask;
