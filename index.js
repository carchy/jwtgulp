
let setting = require('./lib/setting');
//let versionMgr = require('./js/versionMgr');
let cleanDir = require('./lib/cleanPath');
let less = require('./lib/compileless.js');
//let lessr=require('./js/compilelessRelease')
//let tsh = require('./js/rxmPackageJsTask.js');
let tshr = require('./lib/ts2amdes5');
let clone = require('./lib/clone');
let htmlmin = require('./lib/htmlmin');
//let amdVersion=require('./js/rxmAmdVersion')
let argsParse=require('minimist')
class  jwtgulp  {
    constructor() {
        //this.taskSetting({ rxmObj: this });
        //是否是release版本
        
        let knownOptions = {
            boolean: 'release',
            default: { release:false }
          };
        let gulpargs=argsParse(process.argv.slice(2),knownOptions)
        if(gulpargs.release)
        {
            setting.debug=false
        }
        this.release=gulpargs.release
        console.info(this.release?"生成release版本":'生成debug版本')
    }
    version(version){
        version&&(setting.version=version)
        return setting.version
    }
    // taskVersion = function (param) {
    //     let r=versionMgr();
    //    (typeof param !='undefined') &&r.amdjsVersion.bind(param)
    //     return r ;
    // };
    taskLess = function (param) {
        return  less().bind(param);
    };
    taskClean = function (param) {
        return cleanDir().bind(param);
    };
    taskTJs = function (param) {
        return tshr().bind(param);
    };

    taskClone = function (param) {
        return clone().bind(param);
    };
    taskHtml = function (param) {
         return htmlmin().bind(param);
     };
    // amdVersion=function(param){
    //     return amdVersion.bind(param);
    // }}
}

 module.exports= new jwtgulp;
