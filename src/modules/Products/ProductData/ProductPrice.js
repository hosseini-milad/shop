import StyleInput from "../../../components/Button/Input"
import tabletrans from "../../../translate/tables"

function ProductPrice(props){
    const content = props.content
    return(
        <div className="pd-row">
          <div className="row-title">
            <h4>{tabletrans.pricing[props.lang]}</h4>
            <p>{tabletrans.pricingRelative[props.lang]}</p>
          </div>
          <div className="row-box">
              <div className="regular-price info-input" style={{position:"relative"}}>
                <StyleInput  title={tabletrans.regularPrice[props.lang]} direction={props.direction}
                 class={"formInput fullWidth"} defaultValue={content?content.price:''} 
                 icon={<i className="fa-solid fa-dollar"></i>}
                 action={(e)=>props.setProductChange(prevState => ({
                    ...prevState,
                    price:e
                  }))}/>
                
              </div>
              {/*<div className="sale-price info-input">
                <label htmlFor="sale-price">Sale Price</label>
                <i className="fa-solid fa-dollar-sign" style={{color: "#c0c0c0"}}></i>
                <input type="text" name="" id="sale-price"/>
              </div>
              <div className="tax-wrapper">
                <div className="dense-btn">
                  <input className="switch-input" type="checkbox" id="switch-4" />
                  <label className="switch-label" htmlFor="switch-4">Toggle</label>
                </div>
                <p>Price includes taxes</p>
              </div>
              <div className="tax-active-wrapper info-input">
                <label htmlFor="tax-prc">Tax(%)</label>
                <i className="fa-solid fa-percent" style={{color: "#c0c0c0"}}></i>
                <input type="text" name="" id="tax-prc"/>

                </div>*/}
          </div>
        </div>
    )
}
export default ProductPrice