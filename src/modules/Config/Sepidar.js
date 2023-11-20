import env from "../../env"

function Sepidar(){
    const updateSepidar=(db)=>{
        const postOptions={
            method:'get',
            headers: {'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'}
          }
        fetch(env.siteApi + "/sepidar-"+db,postOptions, {mode:'cors'})
      .then(res => res.json())
      .then(
        (result) => {
            console.log(result)
        },
        (error) => {
            console.log(error)
        })
    }
    return(
        <main>
            <input type="button" value="Update Customers"
            onClick={()=>updateSepidar("customer")}/>
            <input type="button" value="Update Products"
            onClick={()=>updateSepidar("product")}/>
        </main>
    )
}
export default Sepidar