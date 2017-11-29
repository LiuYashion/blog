import { resolve } from "dns";


/**
 * fetch-post demo
 */
fetch('/qqagent/baseRqt/repay_succ_detail', {
  method: 'POST',
  headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "repayNo":"928186042803716096"
  }),
  credentials: 'include',
  mode: 'cors'
}).then((response)=>{

  console.log(response)

})


/**
 * 【header】
 *  附带的一些控制信息，可以在我们获得请求体后获取header，也可以在请求前发送
 */

//  1.复写header
var selfHeader = new Headers({
  'Content-type': 'application/json'
})
selfHeader.set('Content-type', 'text/plain')

//  2.校验一下返回体的数据格式，再看是否调用json()
fetch().then((response)=>{
  /\application\/json/.test(response.headers.get("content-type"))
})



/**
 * 【response】
 *  response是fetch在处理完promise之后返回的一个对象
 */
var status      = response.status       //  状态码
var statusText  = response.statusText   //  默认ok
var isOK        = response.ok           //  状态码[200, 299]

fetch().then((response)=>{
  if (response.ok){
    //...
  } else {
    var error = new Error(response.statusText)
    error.response = response
    error.body = response.json()

    throw error;
  }
  
})


/**
 * 【body】
 *  body是request/response所包含的一个对象
 *  request/response实现了下面这些方法
 *  这些方法都会返回一个被解析后的promise对象和数据
 * 
 */
fetch().then((response)=>{
  response.json()
  response.text()
  response.formData()
})