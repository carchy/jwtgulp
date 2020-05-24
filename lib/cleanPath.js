"use strict";
// let fs = require('fs');
// function cleanPath(path) {
//     let files = [];
//     if (fs.existsSync(path)) {
//         files = fs.readdirSync(path);
//         files.forEach(function (file, index) {
//             let curPath = path + "/" + file;
//             if (fs.statSync(curPath).isDirectory()) {
//                 delDir(curPath); //递归删除文件夹
//             }
//             else {
//                 fs.unlinkSync(curPath); //删除文件
//             }
//         });
//         fs.rmdirSync(path);
//     }
// }
let g=require('./setting')
let gulp=require('gulp')  
let clean = require('gulp-clean');
let cleanPath=function()
{
   let  fret =function (){
   let src =this.dstPath
   console.log('clean  path: '+src)
    return gulp.src(src, {read: false,allowEmpty:true})
    .pipe(clean());}
 return fret
}
module.exports = cleanPath;
