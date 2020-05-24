"use strict";
//把ts 文件编译为js文件
let setting = require('./setting')
let gulp = require('gulp');
let plumber = require('gulp-plumber')
let htmlmin=require('gulp-htmlmin')
function ebzhtml() {
    //src: Array<string>
    //dstJsName: string
    //dstPath: string
    let _conf = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    let fret = function () {
        let src = this.src
        let dst = this.dstPath
        console.info('html压缩混淆')
        console.info('源路径: ' + src)
        console.info('目的路径' + dst);
        let cf = Object.assign({}, _conf);
        return   gulp.src(src)       
        .pipe(plumber())     
        .pipe(htmlmin(cf))
        .pipe(gulp.dest(dst))
    }
    return fret
}
module.exports = ebzhtml
