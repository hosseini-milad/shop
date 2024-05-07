var soap = require('soap');
var moment = require('moment');
const orders = require('../models/orders/orders');
const PayLogSchema = require('../models/orders/payLog');
const cart = require('../models/product/cart');
const sepCart = require('../models/product/sepCart');
const customers = require('../models/auth/customers');
const PrepareOrder = require('./PrepareOrder');
var ObjectID = require('mongodb').ObjectID;

moment.locale('en');
const {PayURL,PayCallback, PayTerminalID, PayUsername, PayPassword} = process.env

const mellatWsdl = PayURL;//"https://bpm.shaparak.ir/pgwchannel/services/pgw?wsdl";
const PgwSite = "https://bpm.shaparak.ir/pgwchannel/startpay.mellat";
const callbackUrl = PayCallback; 
const terminalId = PayTerminalID;//this send to you by mellat bank
const userName = PayUsername;//this send to you by mellat bank
const password = PayPassword;//this send to you by mellat bank
const mellatBankReturnCode =
{
     0 :'ﺗﺮاﻛﻨﺶ_ﺑﺎ_ﻣﻮﻓﻘﻴﺖ_اﻧﺠﺎم_ﺷﺪ',
         11: 'ﺷﻤﺎره_ﻛﺎرت_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ',
         12: 'ﻣﻮﺟﻮدي_ﻛﺎﻓﻲ_ﻧﻴﺴﺖ',
         13: 'رﻣﺰ_ﻧﺎدرﺳﺖ_اﺳﺖ',
         14: 'ﺗﻌﺪاد_دﻓﻌﺎت_وارد_ﻛﺮدن_رﻣﺰ_ﺑﻴﺶ_از_ﺣﺪ_ﻣﺠﺎز_اﺳﺖ',
          15:'ﻛﺎرت_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ',
        16: 'دﻓﻌﺎت_ﺑﺮداﺷﺖ_وﺟﻪ_ﺑﻴﺶ_از_ﺣﺪ_ﻣﺠﺎز_اﺳﺖ',
          17:'ﻛﺎرﺑﺮ_از_اﻧﺠﺎم_ﺗﺮاﻛﻨﺶ_ﻣﻨﺼﺮف_ﺷﺪه_اﺳﺖ',
          18:'ﺗﺎرﻳﺦ_اﻧﻘﻀﺎي_ﻛﺎرت_ﮔﺬﺷﺘﻪ_اﺳﺖ',
          19:'ﻣﺒﻠﻎ_ﺑﺮداﺷﺖ_وﺟﻪ_ﺑﻴﺶ_از_ﺣﺪ_ﻣﺠﺎز_اﺳﺖ',


    111: 'ﺻﺎدر_ﻛﻨﻨﺪه_ﻛﺎرت_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ',
          112:'ﺧﻄﺎي_ﺳﻮﻳﻴﭻ_ﺻﺎدر_ﻛﻨﻨﺪه_ﻛﺎرت',
          113:'ﭘﺎﺳﺨﻲ_از_ﺻﺎدر_ﻛﻨﻨﺪه_ﻛﺎرت_درﻳﺎﻓﺖ_ﻧﺸﺪ',
          114:'دارﻧﺪه_ﻛﺎرت_ﻣﺠﺎز_ﺑﻪ_اﻧﺠﺎم_اﻳﻦ_ﺗﺮاﻛﻨﺶ_ﻧﻴﺴﺖ',


          21:'ﭘﺬﻳﺮﻧﺪه_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ',
          23:'ﺧﻄﺎي_اﻣﻨﻴﺘﻲ_رخ_داده_اﺳﺖ',
          24:'اﻃﻼﻋﺎت_ﻛﺎرﺑﺮي_ﭘﺬﻳﺮﻧﺪه_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ',
          25:'ﻣﺒﻠﻎ_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ',
          31:'ﭘﺎﺳﺦ_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ',
          32:'ﻓﺮﻣﺖ_اﻃﻼﻋﺎت_وارد_ﺷﺪه_ﺻﺤﻴﺢ_ﻧﻤﻲ_ﺑﺎﺷﺪ',
          33:'ﺣﺴﺎب_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ',
          34:'ﺧﻄﺎي_ﺳﻴﺴﺘﻤﻲ',
          35:'ﺗﺎرﻳﺦ_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ',
          41:'ﺷﻤﺎره_درﺧﻮاﺳﺖ_ﺗﻜﺮاري_اﺳﺖ',
          42: 'ﺗﺮاﻛﻨﺶ_Sale_یافت_نشد_',
        43: 'ﺒﻼ_Verify_درﺧﻮاﺳﺖ_داده_ﺷﺪه_اﺳﺖ',
        44: 'درخواست_verify_یافت_نشد',
        45: 'ﺗﺮاﻛﻨﺶ_Settle_ﺷﺪه_اﺳﺖ',
        46: 'ﺗﺮاﻛﻨﺶ_Settle_نشده_اﺳﺖ',
        47: 'ﺗﺮاﻛﻨﺶ_Settle_یافت_نشد',
        48: 'تراکنش_Reverse_شده_است',
        49: 'تراکنش_Refund_یافت_نشد',


        412: 'شناسه_قبض_نادرست_است',
        413: 'ﺷﻨﺎﺳﻪ_ﭘﺮداﺧﺖ_ﻧﺎدرﺳﺖ_اﺳﺖ',
        414: 'سازﻣﺎن_ﺻﺎدر_ﻛﻨﻨﺪه_ﻗﺒﺾ_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ',
        415: 'زﻣﺎن_ﺟﻠﺴﻪ_ﻛﺎري_ﺑﻪ_ﭘﺎﻳﺎن_رسیده_است',
        416: 'ﺧﻄﺎ_در_ﺛﺒﺖ_اﻃﻼﻋﺎت',
        417: 'ﺷﻨﺎﺳﻪ_ﭘﺮداﺧﺖ_ﻛﻨﻨﺪه_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ',
        418: 'اﺷﻜﺎل_در_ﺗﻌﺮﻳﻒ_اﻃﻼﻋﺎت_ﻣﺸﺘﺮي',
        419: 'ﺗﻌﺪاد_دﻓﻌﺎت_ورود_اﻃﻼﻋﺎت_از_ﺣﺪ_ﻣﺠﺎز_ﮔﺬﺷﺘﻪ_اﺳﺖ',
        421: 'IP_نامعتبر_است' ,

        51: 'ﺗﺮاﻛﻨﺶ_ﺗﻜﺮاري_اﺳﺖ',
        54: 'ﺗﺮاﻛﻨﺶ_ﻣﺮﺟﻊ_ﻣﻮﺟﻮد_ﻧﻴﺴﺖ',
        55: 'ﺗﺮاﻛﻨﺶ_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ',
        61: 'ﺧﻄﺎ_در_واریز'
};

function desribtionStatusCode(statusCode)
{
    switch (statusCode)
    {
        case 0:
            return 'ﺗﺮاﻛﻨﺶ_ﺑﺎ_ﻣﻮﻓﻘﻴﺖ_اﻧﺠﺎم_ﺷﺪ';
        case 11:
            return 'ﺷﻤﺎره_ﻛﺎرت_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ' ;
        case 12:
            return 'ﻣﻮﺟﻮدي_ﻛﺎﻓﻲ_ﻧﻴﺴﺖ' ;
        case 13:
            return 'رﻣﺰ_ﻧﺎدرﺳﺖ_اﺳﺖ' ;
        case 14:
            return 'ﺗﻌﺪاد_دﻓﻌﺎت_وارد_ﻛﺮدن_رﻣﺰ_ﺑﻴﺶ_از_ﺣﺪ_ﻣﺠﺎز_اﺳﺖ';
        case 15:
            return 'ﻛﺎرت_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ' ;
        case 16:
            return 'دﻓﻌﺎت_ﺑﺮداﺷﺖ_وﺟﻪ_ﺑﻴﺶ_از_ﺣﺪ_ﻣﺠﺎز_اﺳﺖ' ;
        case 17:
            return 'ﻛﺎرﺑﺮ_از_اﻧﺠﺎم_ﺗﺮاﻛﻨﺶ_ﻣﻨﺼﺮف_ﺷﺪه_اﺳﺖ' ;
        case 18:
            return 'ﺗﺎرﻳﺦ_اﻧﻘﻀﺎي_ﻛﺎرت_ﮔﺬﺷﺘﻪ_اﺳﺖ' ;
        case 19:
            return 'ﻣﺒﻠﻎ_ﺑﺮداﺷﺖ_وﺟﻪ_ﺑﻴﺶ_از_ﺣﺪ_ﻣﺠﺎز_اﺳﺖ' ;
        case 111:
            return 'ﺻﺎدر_ﻛﻨﻨﺪه_ﻛﺎرت_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ' ;
        case 112:
            return 'ﺧﻄﺎي_ﺳﻮﻳﻴﭻ_ﺻﺎدر_ﻛﻨﻨﺪه_ﻛﺎرت' ;
        case 113:
            return 'ﭘﺎﺳﺨﻲ_از_ﺻﺎدر_ﻛﻨﻨﺪه_ﻛﺎرت_درﻳﺎﻓﺖ_ﻧﺸﺪ' ;
        case 114:
            return 'دارﻧﺪه_ﻛﺎرت_ﻣﺠﺎز_ﺑﻪ_اﻧﺠﺎم_اﻳﻦ_ﺗﺮاﻛﻨﺶ_ﻧﻴﺴﺖ' ;
        case 21:
            return 'ﭘﺬﻳﺮﻧﺪه_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ' ;
        case 23:
            return 'ﺧﻄﺎي_اﻣﻨﻴﺘﻲ_رخ_داده_اﺳﺖ' ;
        case 24:
            return 'اﻃﻼﻋﺎت_ﻛﺎرﺑﺮي_ﭘﺬﻳﺮﻧﺪه_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ' ;
        case 25:
            return 'ﻣﺒﻠﻎ_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ' ;
        case 31:
            return 'ﭘﺎﺳﺦ_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ' ;
        case 32:
            return 'ﻓﺮﻣﺖ_اﻃﻼﻋﺎت_وارد_ﺷﺪه_ﺻﺤﻴﺢ_ﻧﻤﻲ_ﺑﺎﺷﺪ' ;
        case 33:
            return 'ﺣﺴﺎب_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ' ;
        case 34:
            return 'ﺧﻄﺎي_ﺳﻴﺴﺘﻤﻲ' ;
        case 35:
            return 'ﺗﺎرﻳﺦ_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ' ;
        case 41:
            return 'ﺷﻤﺎره_درﺧﻮاﺳﺖ_ﺗﻜﺮاري_اﺳﺖ' ;
        case 42:
            return 'ﺗﺮاﻛﻨﺶ_Sale_یافت_نشد_' ;
        case 43:
            return 'ﻗﺒﻼ_Verify_درﺧﻮاﺳﺖ_داده_ﺷﺪه_اﺳﺖ' ;



        case 44:
            return 'درخواست_verify_یافت_نشد' ;
        case 45:
            return 'ﺗﺮاﻛﻨﺶ_Settle_ﺷﺪه_اﺳﺖ' ;
        case 46:
            return 'ﺗﺮاﻛﻨﺶ_Settle_نشده_اﺳﺖ' ;

        case 47:
            return 'ﺗﺮاﻛﻨﺶ_Settle_یافت_نشد' ;
        case 48:
            return 'تراکنش_Reverse_شده_است' ;
        case 49:
            return 'تراکنش_Refund_یافت_نشد' ;
        case 412:
            return 'شناسه_قبض_نادرست_است' ;
        case 413:
            return 'ﺷﻨﺎﺳﻪ_ﭘﺮداﺧﺖ_ﻧﺎدرﺳﺖ_اﺳﺖ' ;
        case 414:
            return 'سازﻣﺎن_ﺻﺎدر_ﻛﻨﻨﺪه_ﻗﺒﺾ_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ' ;
        case 415:
            return 'زﻣﺎن_ﺟﻠﺴﻪ_ﻛﺎري_ﺑﻪ_ﭘﺎﻳﺎن_رسیده_است' ;
        case 416:
            return 'ﺧﻄﺎ_در_ﺛﺒﺖ_اﻃﻼﻋﺎت' ;
        case 417:
            return 'ﺷﻨﺎﺳﻪ_ﭘﺮداﺧﺖ_ﻛﻨﻨﺪه_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ' ;
        case 418:
            return 'اﺷﻜﺎل_در_ﺗﻌﺮﻳﻒ_اﻃﻼﻋﺎت_ﻣﺸﺘﺮي' ;
        case 419:
            return 'ﺗﻌﺪاد_دﻓﻌﺎت_ورود_اﻃﻼﻋﺎت_از_ﺣﺪ_ﻣﺠﺎز_ﮔﺬﺷﺘﻪ_اﺳﺖ' ;
        case 421:
            return 'IP_نامعتبر_است' ;

        case 51:
            return 'ﺗﺮاﻛﻨﺶ_ﺗﻜﺮاري_اﺳﺖ' ;
        case 54:
            return 'ﺗﺮاﻛﻨﺶ_ﻣﺮﺟﻊ_ﻣﻮﺟﻮد_ﻧﻴﺴﺖ' ;
        case 55:
            return 'ﺗﺮاﻛﻨﺶ_ﻧﺎﻣﻌﺘﺒﺮ_اﺳﺖ' ;
        case 61:
            return 'ﺧﻄﺎ_در_واریز' ;

    }
    return "";
}

 function bpPayRequest (orderId, priceAmount, additionalText, callbackUrl) {
     const localDate = moment().format('YYYYMMDD');
     const localTime = moment().format('HHmmss');
    const args = {
        terminalId: terminalId,
        userName: userName,
        userPassword: password,
        orderId: orderId,
        amount: priceAmount,
        localDate: localDate,
        localTime: localTime,
        additionalData: additionalText,
        callBackUrl: callbackUrl,
        payerId: 0
    };
    //console.log(args)
     var options = {
         overrideRootElement: {
             namespace: 'ns1'
         }
     };

    return new Promise ((resolve, reject) => {
        soap.createClient(mellatWsdl, options, (err, client) => {
            client.bpPayRequest(args, (err, result, body) => {

                if(err) {
                    console.log("Error: ")
                    console.log(err);
                    reject(err);
                }
                return resolve(result);
            })
        });
    });
}

function bpVerifyRequest (orderId, saleOrderId, saleReferenceId) {
    const args = {
        terminalId: terminalId,
        userName: userName,
        userPassword: password,
        orderId: orderId,
        saleOrderId: saleOrderId,
        saleReferenceId: saleReferenceId,
    };

    var options = {
        overrideRootElement: {
            namespace: 'ns1'
        }
    };

    return new Promise ((resolve, reject) => {
        soap.createClient(mellatWsdl, options, (err, client) => {
            client.bpVerifyRequest(args, (err, result, body) => {

                if(err) {
                    //console.log(err);
                    reject(err);
                }
                return resolve(result);
            })
        });
    });
}

function bpInquiryRequest (orderId, saleOrderId, saleReferenceId) {
    const args = {
        terminalId: terminalId,
        userName: userName,
        userPassword: password,
        orderId: orderId,
        saleOrderId: saleOrderId,
        saleReferenceId: saleReferenceId,
    };

    var options = {
        overrideRootElement: {
            namespace: 'ns1'
        }
    };

    return new Promise ((resolve, reject) => {
        soap.createClient(mellatWsdl, options, (err, client) => {
            client.bpInquiryRequest(args, (err, result, body) => {

                if(err) {
                    //console.log(err);
                    reject(err);
                }
                return resolve(result);
            })
        });
    });
}

function bpSettleRequest (orderId, saleOrderId, saleReferenceId) {
    const args = {
        terminalId: terminalId,
        userName: userName,
        userPassword: password,
        orderId: orderId,
        saleOrderId: saleOrderId,
        saleReferenceId: saleReferenceId,
    };

    var options = {
        overrideRootElement: {
            namespace: 'ns1'
        }
    };

    return new Promise ((resolve, reject) => {
        soap.createClient(mellatWsdl, options, (err, client) => {
            client.bpSettleRequest(args, (err, result, body) => {

                if(err) {
                    //console.log(err);
                    reject(err);
                }
                return resolve(result);
            })
        });
    });
}

function bpReversalRequest (orderId, saleOrderId, saleReferenceId) {
    const args = {
        terminalId: terminalId,
        userName: userName,
        userPassword: password,
        orderId: orderId,
        saleOrderId: saleOrderId,
        saleReferenceId: saleReferenceId,
    };

    var options = {
        overrideRootElement: {
            namespace: 'ns1'
        }
    };

    return new Promise ((resolve, reject) => {
        soap.createClient(mellatWsdl, options, (err, client) => {
            client.bpReversalRequest(args, (err, result, body) => {

                if(err) {
                    //console.log(err);
                    reject(err);
                }
                return resolve(result);
            })
        });
    });
}

async function reversePay(orderId, saleOrderId, saleReferenceId) {
    let resultReversePay = await bpReversalRequest(orderId, saleOrderId, saleReferenceId);
    resultReversePay=resultReversePay.return;
    console.log(resultReversePay);
}

 
exports.pay = async (req, res) => {
    if(req.query.userid) {

        //const credit = parseInt(req.query.credit);

        var userid = req.query.userid

        const orderDetail = await PrepareOrder(userid)
        const orderId = orderDetail.orderId
        const orderPrice = orderDetail.orderPrice
        const orderCount = orderDetail.orderCount
        const orderData = orderDetail.orderData
        const newOrder = await orders.create({
            userId:ObjectID(userid),
            orderNo:orderId,
            transport:req.query.transport,
            orderCount:orderCount,
            orderPrice:orderPrice,
            orderItems:orderData,
            status:"initial",
            payStatus: "undone",
            description:"Test order"
        })
        if(newOrder) await sepCart.deleteMany({userId:ObjectID(userid)})
        if(!orderData)
            return res.status(422).json({error: 'سفارش پیدا نشد'});
        //const credit = orderData.stockOrderPrice
        //orderId = await OrderNoBank(orderId,1)
        //const orderId = moment().valueOf();
        console.log("Request Now: ");
            let payRequestResult =''
            const query = {orderNo:orderId,payStatus:"sendToBank",
            userId:userid,orderPrice:orderPrice}
            //return
            await PayLogSchema.create(query)
            try{
                payRequestResult = await bpPayRequest(orderId, parseInt(orderPrice), 'ok', callbackUrl);
            }
            catch{
                return res.status(422).json({error: 'اطلاعات ورودی اشتباه است.'});
            }
            console.log(payRequestResult);
            payRequestResult = payRequestResult.return;
            payRequestResult = payRequestResult.split(",");
            if(parseInt(payRequestResult[0]) === 0) {
                return res.render('redirect_vpos.ejs', {bank_url: PgwSite, RefId: payRequestResult[1]});
            }else {
                if(payRequestResult[0] === null) {
                    return res.render('mellat_payment_result.ejs', {error: 'هیچ شماره پیگیری برای پرداخت از سمت بانک ارسال نشده است!'})
                }else {
                    let error = desribtionStatusCode(parseInt(payRequestResult)).replace(/_/g, " ");
                    return res.render('mellat_payment_result.ejs', {error})
                }
            }

    }else {
        return res.status(422).json({error: 'شماره سفارش را وارد کنید.'});
    }
};



exports.callBack = async (req, res) => {
    let Run_bpReversalRequest = false;
    let saleReferenceId = -999;
    let saleOrderId = -999;
    let resultCode_bpPayRequest;

    if(req.body.ResCode === null || req.body.SaleOrderId === null
        || req.body.SaleReferenceId === null || req.body.CardHolderPan === null)
    {
        return res.status(422).json({error: 'پارامترهای لازم از طرف بانک ارسال نشد.'});
    }
    saleReferenceId = parseInt(req.body.SaleReferenceId, 10);
    saleOrderId = parseInt(req.body.SaleOrderId, 10);
    resultCode_bpPayRequest = parseInt(req.body.ResCode);
    const cardHolderPan = req.body.CardHolderPan;
    console.log(req.body);

    //Result Code
    let  resultCode_bpinquiryRequest = "-9999";
    let resultCode_bpSettleRequest = "-9999";
    let resultCode_bpVerifyRequest = "-9999";

    if(resultCode_bpPayRequest === 0) {
        //verify request
        resultCode_bpVerifyRequest = await bpVerifyRequest(saleOrderId, saleOrderId, saleReferenceId);
        resultCode_bpVerifyRequest = resultCode_bpVerifyRequest.return;
        console.log('bpVerifyRequest:'+resultCode_bpVerifyRequest);

        if(resultCode_bpVerifyRequest === null || resultCode_bpVerifyRequest.length === 0) {
            //Inquiry Request
            resultCode_bpinquiryRequest = await bpInquiryRequest(saleOrderId, saleOrderId, saleReferenceId);
            resultCode_bpinquiryRequest = parseInt(resultCode_bpinquiryRequest.return);
            console.log('bpinquiryRequest'+resultCode_bpinquiryRequest);

            if(resultInquiryRequest !== 0) {
                reversePay(saleOrderId, saleOrderId, saleReferenceId);
                const error = desribtionStatusCode(resultCode_bpinquiryRequest);
                const query = {orderNo:saleOrderId,payStatus:"undone",
                saleReferenceId:saleReferenceId,statusCode:resultInquiryRequest}
                await PayLogSchema.create(query)
                await orders.updateOne({orderNo:saleOrderId},{$set:{payStatus:"undone"}})
                return res.render('mellat_payment_result.ejs', {error});
            }
        }

        if(parseInt(resultCode_bpVerifyRequest) === 0 || resultCode_bpinquiryRequest === 0) {
            //SettleRequest
            resultCode_bpSettleRequest = await bpSettleRequest(saleOrderId, saleOrderId, saleReferenceId);
            resultCode_bpSettleRequest = parseInt(resultCode_bpSettleRequest.return);
            console.log('bpSettleRequest'+resultCode_bpSettleRequest);

            //ﺗﺮاﻛﻨﺶ_Settle_ﺷﺪه_اﺳﺖ
            //ﺗﺮاﻛﻨﺶ_ﺑﺎ_ﻣﻮﻓﻘﻴﺖ_اﻧﺠﺎم_ﺷﺪ
            if(resultCode_bpSettleRequest === 0 || resultCode_bpSettleRequest === 45) {
                //success payment
                const query = {orderNo:saleOrderId,payStatus:"paid",
                saleReferenceId:saleReferenceId,query:req.body}
                await PayLogSchema.create(query)
                await orders.updateOne({orderNo:saleOrderId},{$set:{payStatus:"paid"}})
                await openOrders.updateMany({orderNo:saleOrderId},{$set:{payStatus:"paid"}})
                let msg = 'تراکنش شما با موفقیت انجام شد ';
                msg += " لطفا شماره پیگیری را یادداشت نمایید" + saleReferenceId;

                //save success payment into db


                return res.render('mellat_payment_result.ejs', {msg});
            }
        }else {
            if (saleOrderId != -999 && saleReferenceId != -999) {
                const query = {orderNo:saleOrderId,payStatus:"undone",query:req.body,
                saleReferenceId:saleReferenceId,errorMessage:"123",errorCode:resultCode_bpPayRequest}
                await PayLogSchema.create(query)
                await orders.updateOne({orderNo:saleOrderId},{$set:{payStatus:"undone"}})
                if(resultCode_bpPayRequest !== 17)
                    reversePay(saleOrderId, saleOrderId, saleReferenceId);
            }

            const error = desribtionStatusCode(resultCode_bpVerifyRequest);

            return res.render('mellat_payment_result.ejs', {error});
        }
    }else {
            if (saleOrderId != -999 && saleReferenceId != -999) {
                if(resultCode_bpPayRequest !== 17)
                reversePay(saleOrderId, saleOrderId, saleReferenceId);
                const error = desribtionStatusCode(resultCode_bpPayRequest);
                const query = {orderNo:saleOrderId,payStatus:"undone",
                saleReferenceId:saleReferenceId,errorMessage:"123",errorCode:resultCode_bpPayRequest}
                await PayLogSchema.create(query)
                await orders.updateOne({stockOrderNo:saleOrderId},{$set:{payStatus:"undone"}})
                return res.render('mellat_payment_result.ejs', {error});
            }
    }

};