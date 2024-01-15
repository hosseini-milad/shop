import Cookies from 'universal-cookie';
import env from "../env";
const cookies = new Cookies();

async function SimpleAuth(apiUrl){
    const token=cookies.get(env.cookieName)
    
    if(token === null)return("not authorized")
    const getOptions={
      method:'get',
      headers: {'Content-Type': 'application/json',
      "x-access-token":token.token,"userId":token.userId}
    }
    fetch(apiUrl,getOptions)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          return(result)
        },
        (error) => {
          return(error);
        }
      )
    }
export default SimpleAuth