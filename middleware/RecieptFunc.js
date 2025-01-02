const RecieptFunc=async(data,InvoiceID,Number,faktorNo)=>{
    var query ={
        "GUID": "124ab075-fc79-417f-b8cf-2a"+faktorNo,
        "InvoiceID": InvoiceID,
        "Description": Number,
        "Date":new Date(),
        "Drafts": 
          data.filter(n => n).map((pay,i)=>(
            {
            "BankAccountID": pay.bankCode,
            "Description": pay.title,
            "Number": pay.description?pay.description:"000",
            "Date":new Date(),
            "Amount": pay.payValue
          }))
        
      }
    return(query)
}
module.exports =RecieptFunc