import { PriceDiscount, normalPriceCount, rxFindCount } from "../../../env"
import tabletrans from "../../../translate/tables"
import ServiceBrandHolder from "../ServiceComponent/ServiceBrandHolder"

function ServiceOptions(props){
    return(
      <div className="item-box">
        <div className="item-col">
          <div className="dem-input">
            <h6>Dimensions</h6>
            <div className="dem-wrapper">
              <input type="text" name="" id="" placeholder="Length"/>
              <p>X</p>
              <input type="text" name="" id="" placeholder="Width"/>
              <p>X</p>
              <input type="text" name="" id="" placeholder="height"/>
              <select name="" id="">
                <option value="cm">Cm</option>
                <option value="in">In</option>
              </select>
            </div>
          </div>
          <div className="manu-input info-input">
            <label htmlFor="manu">Manufacturer</label>
            <select name="" id="manu"></select>
          </div>
          <div className="upc-input info-input">
            <label htmlFor="upc">UPC</label>
            <input type="text" id="upc"/>
          </div>
          <div className="ean-input info-input">
            <label htmlFor="ean">EAN</label>
            <input type="text" id="ean"/>
          </div>
        </div>
        <div className="item-col">
          <div className="weight-input">
            <h6>weight</h6>
            <div className="weight-wrapper">
              <input type="text" name="" id=""/>
              <select name="" id="">
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="lb">lb</option>
              </select>
            </div>
          </div>
          <ServiceBrandHolder />
          <div className="mpn-input info-input">
            <label htmlFor="mpn">MPN</label>
            <input type="text" id="mpn"/>
          </div>
          <div className="isbn-input info-input">
            <label htmlFor="isbn">ISBN</label>
            <input type="text" id="isbn"/>
          </div>
        </div>
      </div>
    )
}
export default ServiceOptions