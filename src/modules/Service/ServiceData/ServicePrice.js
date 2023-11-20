import StyleInput from "../../../components/Button/Input"
import { PriceDiscount, normalPriceCount, rxFindCount } from "../../../env"
import formtrans from "../../../translate/forms"
import tabletrans from "../../../translate/tables"

function ServicePrice(props){
  const brand=props.brand
  var fCode=props.fCode
  try{fCode =JSON.parse(props.fCode)}catch{}
  var price=props.price
  try{price =JSON.parse(props.price)}catch{}
  var purchase=props.purchase
  try{purchase=JSON.parse(props.purchase)}catch{}
  const updatePrice=(newPrice)=>{
    var oldPrice = price?price:{}
    oldPrice[brand] = newPrice
    
    props.setPrice(oldPrice)
  }
  const updatePurchase=(newPrice)=>{
    var oldPrice = purchase?purchase:{}
    oldPrice[brand] = newPrice
    
    props.setPurchase(oldPrice)
  }
  const updateFactoryCode=(newPrice)=>{
    var oldPrice = fCode?fCode:{}
    oldPrice[brand] = newPrice
    
    props.setFCode(oldPrice)
  }
    return(
        <div className="item-box">
        <div className="item-col">
          <div className="sale-input">
            <input type="checkbox" name="" id="sales"/>
            <label htmlFor="sales">{formtrans.saleInformation[props.lang]}</label>
          </div>
          <div className="price-input">
              <StyleInput title={formtrans.sellingPrice[props.lang]} direction={props.direction}
              defaultValue={price?price[brand]:''}
              action={(e)=>updatePrice(e)} icon={"IRR"}/>
           
          </div>
          <div className="account-input info-input">
            <StyleInput title={"کد کارخانه"} direction={props.direction}
              defaultValue={fCode?fCode[brand]:''}
              action={(e)=>updateFactoryCode(e)}/>
          </div>
          {/*<div className="description-input info-input">
            <label htmlFor="desc">Description</label>
            <textarea name="" id=""></textarea>
          </div>
          <div className="tax-input info-input">
            <label htmlFor="tax-1">Tax</label>
            <select name="" id="tax-2"></select>
    </div>*/}
        </div>
        <div className="item-col">
          <div className="sale-input">
            <input type="checkbox" name="" id="sales-2"/>
            <label htmlFor="sales-2">{formtrans.purchaseInformation[props.lang]}</label>
          </div>
          <div className="price-input">
              <StyleInput title={formtrans.purchasePrice[props.lang]} direction={props.direction}
              defaultValue={purchase?purchase[brand]:''}
              action={(e)=>updatePurchase(e)} icon={"IRR"}/>
           
          </div>
          {/*<div className="account-input info-input">
            <label htmlFor="account">Account</label>
            <select name="" id="account">
              <option value="sales">Sales</option>
              <option value="discount">discount</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="description-input info-input">
            <label htmlFor="desc">Description</label>
            <textarea name="" id=""></textarea>
          </div>
          <div className="tax-input info-input">
            <label htmlFor="tax-1">Tax</label>
            <select name="" id="tax-2"></select>
          </div>
          <div className="Vendor-input info-input">
            <label htmlFor="Vendor">Preferred Vendor</label>
            <select name="" id="Vendor"></select>
  </div>*/}
        </div>
      </div>
    )
}
export default ServicePrice