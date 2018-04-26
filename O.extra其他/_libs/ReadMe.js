
//  在zepto中新建一个事件
Zepto('#d5').on('tap', function(){
    console.log('~~~~')
})

//  定义一些必要的变量,工具函数
var _zid = 1
var handler = {}
var zid = function(element){
    return element._zid || (element._zid == _zid++)
}

//  调用 $.fn.on,然后调用add
$.fn.on = function(event, selector, data, callback, one){}
//  处理之后('click', undefined, fn, undefined, undefined)

add(element, event, callback, data, selector, delegator || autoRemove)
//  add(dom, 'click', undefined, fn, undefined, undefined)