"use strict";
let gulp = require('gulp')
let less = require('gulp-less')
let cssmin = require('gulp-clean-css')
let sourcemaps = require('gulp-sourcemaps')
let plumber = require('gulp-plumber')
let compileless = function () {
        let publishLess = function () {
                let src = this.srcLess
                let dst = this.dstPath
                console.log('编译压缩less')
                console.log('源文件: ' + src.join(','))
                console.log('目标路径: ' + dst)
                return gulp.src(src)
                        .pipe(plumber())
                        .pipe(less({processImport: false}))
                        .pipe(cssmin(
                                {
                                    inline: false,
                                        advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
                                        compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
                                        //keepBreaks: true,//类型：Boolean 默认：false [是否保留换行]
                                        keepSpecialComments: '*'
                                        //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
                                }
                        )) //兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
                        .pipe(plumber.stop())
                        .pipe(gulp.dest(dst));
        }
        return publishLess
}
module.exports = compileless;
