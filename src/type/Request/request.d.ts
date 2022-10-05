declare type Result<T> = {Ok:boolean,Msg?:string} & {[P in keyof T]?:T[P]}
declare type IterableData<T> = T extends object ? T & {[key:string]:any} : T