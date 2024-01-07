function CallbackUrl(){
    const url= document.location.pathname;
    console.log(url)
    var state = '';
    try{
        state = url.split('/')[2];
    }
    catch{

    }
    return(<>
        {state==="fail"?<h1>
            خطا در تراکنش
        </h1>:
        <h1>پرداخت با موفقیت انجام شد</h1>}
    </>)
}
export default CallbackUrl