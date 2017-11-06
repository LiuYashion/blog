
//  在zepto中新建一个事件
Zepto('#d5').on('tap', function(){
    console.log('~~~~')
})


//  1. 定义一些必要的变量,工具函数
var _zid = 1
var handler = {}
var zid = function(element){
    return element._zid || (element._zid == _zid++)
}


//  2. 调用 $.fn.on,然后调用add
$.fn.on = function(event, selector, data, callback, one){
    //  add(dom, 'click', undefined, fn, undefined, undefined)
    add(element, event, callback, data, selector, delegator || autoRemove)
}


//  3. 在add方法中,handler被加工成为
var handler = {
    e: 'click',
    fn: callback,
    sel: undefined,
    del: undefined,
    proxy: function(e){
        var result = callback.apply(element, [e])
        return result
    }
}

