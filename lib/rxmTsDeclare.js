"use strict";
let gulp = require('gulp');
let ts = require('gulp-typescript');
let plumber = require('gulp-plumber')
function tscExc() {
    let ret = function () {
        let src = this.src
        let dst = this.dstPath
        let dts=this.dstJsName
        let _conf = {
            "target": "es5",
            "module": "amd",
            "allowJs": false,
             outFile: dts,
            "strict": true,
            "esModuleInterop": true,
            declaration: true,

        };

        let cf = Object.assign({}, _conf);
        console.log('编译声明文件 '+src +' to '+dst )
    
        let tsProject = ts.createProject(cf);
        return gulp.src(src)
            .pipe(plumber())
            .pipe(tsProject())
            .pipe(plumber.stop())
            .pipe(gulp.dest(dst));
    }
    return ret
}
module.exports = tscExc;
