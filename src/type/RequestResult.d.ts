declare type Result<T> = {Ok:boolean,Msg?:string} & {[P in keyof T]?:T[P]}