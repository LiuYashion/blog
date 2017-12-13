var param = {
  "channel":"xhd",
  "user_id":"6448bacfb93460725147604ef1c73b9e",
  "product_no":"P2001002",
  "loan_amount":"1500.00",
  "loan_period":30,
  "start_time":"2017-12-13",
  "service_type":"getLoanCondition",
  "period_unit":"D",
  "price_version":"2",
  "loanNo":""
}; 

var res = {
  "channel":"xhd",
  "detailList":{
      "loanScale":{
          "contract_name":"信而富现金贷借款服务协议",
          "contract_version":"0.01",
          "day_scale":"1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|",
          "errorMessag":"",
          "loan_amount_max":"1800.00",
          "loan_amount_min":"100.00",
          "loan_amount_step":"100.00",
          "period_amount_min":"50.00",
          "period_limit":"100",
          "period_scale":"",
          "result":"0",
          "return_ability":"1500",
          "used_limit":"1500.0"
      },
      "LoanPlan":[
          {
              "currBillDate":"2018-01-12",
              "currCountMstAtm":"1544.99",
              "currEndMstAtm":"0.00",
              "currInterest":"30.00",
              "currMstAtm":"1500.00",
              "currStartMstAtm":"1500.00",
              "handleFee":"14.99",
              "period":"1"
          }
      ],
      "LoanClause":{
          "billDate":"2018-01-12",
          "channelFee":"",
          "countMstAtm":"1544.99",
          "dInterestRate":"0.0007",
          "dOverDueRate":"3.0000",
          "dailyFreeHandFeeTimes":"3",
          "handingFeeFix":"14.99",
          "interestFreeDays":"3",
          "loanAmount":"1500.00",
          "loanPeriod":"30",
          "mInterestRate":"0.0200",
          "mOverDueRate":"90.0000",
          "monthFreeHandFeeTimes":"30",
          "overDueFreeDays":"3",
          "periodYN":"N",
          "productVersion":"1",
          "startTime":"2017-12-13",
          "totalInterestFee":"30.00",
          "totalRtnAmount":"1500.00",
          "yInterestRate":""
      }
  },
  "result":"0",
  "errMsg":""
}

var globArrA = [];
var globArrB = [];

temp1.forEach(element => {

  var loanNo = element.loanNo; 

  console.log(element)
  var _loanNo = loanNo

  delete element.loanNo; 
  
  fetch('http://uap.crfchina.com/productmaninterface/gateInServer/runCat.html',{
    method:'post'
    ,body:JSON.stringify(element),
    headers:{
      'Content-Type':'application/json'
    }
  })
  .then(response => response.json()) 
  .then(response => { 
    //console.log(JSON.stringify(response)) ; 
    
    if(response.errMsg != ""){
      console.log(1, response.errMsg, _loanNo)
    }
    
    var dataJson = response; 
    var crfUid  = element.user_id; 
  
    let loanPlan = dataJson.detailList.LoanPlan[0]; 
    var currBillDate  = loanPlan.currBillDate; 
    var currStartMstAtm = loanPlan.currStartMstAtm; 
    var currMstAtm  = loanPlan.currMstAtm; 
    var currInterest  = loanPlan.currInterest; 
    var handleFee = loanPlan.handleFee; 
    var currEndMstAtm = loanPlan.currEndMstAtm; 
  
    var loanClause=JSON.stringify(dataJson.detailList.LoanClause); 
  
    var a = `INSERT INTO agt_repay_plan (org_no,crf_uid,mct_no,loan_no,period_no,due_date,plan_init_amt,plan_principal_amt,plan_int_amt,plan_fee_amt,plan_end_amt,version) VALUES ('CRF01','${crfUid}','CRF0000001','${loanNo}',1,'${currBillDate}',${currStartMstAtm},${currMstAtm},${currInterest},${handleFee},${currEndMstAtm},0);`; 
  
  
    var b = `INSERT INTO agt_loan_price (org_no,crf_uid,mct_no,loan_no,price_param,version) VALUES ('CRF01','${crfUid}','CRF0000001','${loanNo}','${loanClause}',0);`; 
  
    globArrA.push(a)
    globArrB.push(b)
    
  }).catch((response)=>{
    //console.log(response)
  })

});









