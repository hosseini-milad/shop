import env, { normalArrayRound } from "../../../env"

function OrderMultiReg(props){
    const token = props.token
    const orders = props.orders
    const totalPrice = normalArrayRound(orders&&
      orders.map(item=>(item.totalCart&&item.totalCart.totalPrice)))
    const setSepidarTotal=()=>{
      if(!orders||!orders.length)
        return('no order selected')
      const body={
        orderNo:orders.map(item=>item.cartNo)
      }
      const postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json',
          "x-access-token":token&&token.token,"userId":token&&token.userId},
          body:JSON.stringify(body)
        }
        console.log(postOptions)
    fetch(env.siteApi + "/setting/multi-sepidar",postOptions)
    .then(res => res.json())
    .then(
      (result) => {
        console.log(result)
      },
      (error) => {
        console.log(error);
      })
    }
    return(
      <tbody>
          {props.orders&&props.orders.length?<tr>
            <td></td>
            <td colSpan={3}>بانک ها</td>
            <td colSpan={2}>مبلغ کل: {totalPrice}</td>
            <td colSpan={3} className="regSepidar">
              <input type ="button" className="regSepidar"
              value="ثبت سپیدار" 
              onClick={setSepidarTotal}/></td>
          </tr>:<></>}
        </tbody>
    )
}
export default OrderMultiReg