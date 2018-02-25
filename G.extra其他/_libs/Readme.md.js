


/////////////////////////////////////////////////////////////////
//  1.0  在zepto中新建一个事件
Zepto('#d5').on('tap', function(){
    console.log('~~~~')
})

//  1.1 定义一些必要的变量,工具函数
var _zid = 1
var handler = {}
var zid = function(element){
    return element._zid || (element._zid == _zid++)
}

//  1.2 调用 $.fn.on,然后调用add
$.fn.on = function(event, selector, data, callback, one){
    //  add(dom, 'click', undefined, fn, undefined, undefined)
    add(element, event, callback, data, selector, delegator || autoRemove)
}

//  1.3 在add方法中,handler被加工成为
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
set = handlers[_zid]
set.push(handler)
element.addEventListener(handler.e, handler.proxy)

//  1.4 当我们触发click的时候，就会调用上面的
callback.apply(element, [e])

//  1.5  这是一个最简单的触发过程

/////////////////////////////////////////////////////////////////
//  2.0  绑定一个一次性事件
Zepto('#d5').one('tap', function(){
    console.log('~~~~')
})

//  2.1  这里痛1.1一样，要定义一些变量和工具函数

//  2.2  同上
$.fn.one = function(event, selector, data, callback){
    return this.on(event, selector, data, callback, 1)
}
$.fn.on = function(event, selector, data, callback, one){
    if(one) {
        autoRemove = function(e){
            remove(element, e.type, callback)
            return callback.apply(this, arguments)
        }
    }
    //  add(dom, 'click', undefined, fn, undefined, 1)
    add(element, event, callback, data, selector, delegator || autoRemove)
}

//  2.3  上面定义的remove方法，其中内容为，这样触发后，先移除监听，然后再apply调用一次
function reomve(element, events, fn, selector, capture) {
    delete handlers[_zid][handler.i]
    element.removeEventListener(handler.e, handler.proxy)
}





