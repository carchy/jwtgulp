declare interface  ts2amdes5{
       src:String|String[]
       dstPath:String
       fileName?:String
       excludejs:Boolean
}

declare interface Jwtgulp{
    taskTJs(args:ts2amdes5):void
}
declare  let jwtgulp:Jwtgulp
export default jwtgulp