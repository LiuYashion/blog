
require('whatwg-fetch');





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

  console.log(response.json())
  

}).then((response)=>{
  
}).catch(()=>{
  
})








// fetch('/qqagent/baseRqt/repay_succ_detail', {
//   method: 'POST',
//   headers: { 
//     'Accept': 'application/json', 
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     "repayNo":"928186042803716096"
//   }),
//   credentials: 'include',
//   mode: 'cors'
// }).then((response)=>{
//   if (response.status >= 200 && response.status < 300) {
//     return response.json();
//   } else {
//     let error = new Error(response.statusText);
//     error.response = response;
//     error.body = response.json();
//     throw error;
//   }
// }).then((response)=>{
//   console.log(response)
// }).catch(()=>{
//   console.log()
// })