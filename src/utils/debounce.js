function debounce(func,time){
    let timeout
    // args为返回函数调用时传入的参数，传给method
    return function(...args) {
        let context = this
        if (timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, time)
    }
}
export default debounce