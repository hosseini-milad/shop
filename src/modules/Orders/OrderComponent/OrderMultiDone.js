import env, { normalArrayRound } from "../../../env"

function OrderMultiDone(props){
    const token = props.token
    const orders = props.orders
    // const totalPrice = normalArrayRound(orders&&
    //   orders.map(item=>(item.totalCart&&item.totalCart.totalPrice)))
    const setSepidar=()=>{
      if(!orders||!orders.length)
        return('no order selected')
      const body={
        status:"sepidar",
        orders:orders.map(item=>item.cartNo)
      }
      const postOptions={
          method:'post',
          headers: {'Content-Type': 'application/json',
          "x-access-token":token&&token.token,"userId":token&&token.userId},
          body:JSON.stringify(body)
        }
        console.log(postOptions)
    fetch(env.siteApi + "/panel/crm/update-bulk",postOptions)
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
            
            <td colSpan={7}></td>
            <td colSpan={2} className="bold-td">تعداد کل: {orders.length}</td>
            <td colSpan={3} className="regSepidar">
              <input type ="button" className="regSepidar"
              value="ثبت سپیدار" 
              onClick={setSepidar}/></td>
          </tr>:<></>}
        </tbody>
    )
}
export default OrderMultiDone