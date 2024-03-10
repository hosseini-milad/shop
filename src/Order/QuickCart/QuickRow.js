import env, { payValue } from "../../env"

function QuickRow(props){
    const data = props.data
    console.log(data)
    const token = props.token
    const user = props.user
    const removeItem=()=>{
        const postOptions={
            method:'post',
            headers: { 'Content-Type': 'application/json' ,
            "x-access-token": token&&token.token,
            "userId":token&&token.userId},
            body:JSON.stringify({userId:user?user.Code?user.Code:
                user._id:(token&&token.userId),
                cartID:data.id})
          }
          console.log(postOptions)
        fetch(env.siteApi + "/panel/faktor/remove-cart",postOptions)
        .then(res => res.json())
        .then(
            (result) => {
                if(result)
                    props.setCart(result) 
            },
            (error) => {
                console.log(error)
            })
    }
    return(
        <tr className="product-tr">
            <td data-cell="ردیف">
            <p>{props.index}</p>
            </td>

            <td data-cell="کد کالا">
            <p>{data.sku}</p>
            </td>
            <td data-cell="شرح کالا">
            <div className="product-title">
                <img src="/img/business/oil1.png" alt="avatar"/>
                <div className="product-name">
                <p className="name">{data.title}</p>

                </div>
            </div>
            </td>
            <td data-cell="تعداد">
            <p>{data.count}</p>
            </td>
            <td data-cell="مبلغ واحد">
            <p>{payValue(data.price,props.payValue,1)}</p>
            </td>
            <td data-cell="تخفیف">
            <p>-</p>
            </td>
            <td data-cell="مبلغ کل">
            <p>{payValue(data.price,props.payValue,data.count)}</p>
            </td>
            <td>
            <div className="more-btn">
                <i className="fa-solid fa-pen"></i>
                <i className="fa-solid fa-comment"></i>
                <i className="fa-solid fa-trash" style={{color: "red"}}
                onClick={removeItem}></i>
            </div>
            </td>
        </tr>
    )
}
export default QuickRow