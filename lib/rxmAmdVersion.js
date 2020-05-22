let setting=require('./rxmPackageSetting')
let vrsn=setting('version')
let fs=require('fs')
/**
 * 
 * @param {{src:string,dst:string}} this 
 */
let amdVersion=function()
{
    let template='_edit/_version/amdversion.js'
    this.src&&(template=this.src)
    console.info(template)
    console.info('vsrnjsthis:'+this.dst)
    let dest=this.dst
    console.info('vsrnjsdst'+dest)
    /**@type {string} */
    let s= fs.readFileSync(template)
    s=s.toString('UTF-8').replace(/{version}/g,vrsn)
    fs.writeFileSync(dest,s)
}

module.exports=amdVersion