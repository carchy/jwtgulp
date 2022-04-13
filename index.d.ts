declare interface  ts2amdes5{
       src: string | string[]
       dstPath : string
       fileName? : string
       excludejs? : boolean
       tsconfig? : any
       version?  :string
}

declare interface gulpEx{
    taskTJs(args:ts2amdes5):void
}
declare  let gulpex:gulpEx
export default gulpex