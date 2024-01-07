import {useState, useEffect } from "react";
function SimpleAuth(apiUrl,post){
    const [item, setItem] = useState('')
    var token = JSON.parse(localStorage.getItem('token-oil'));
    if(token !== null)token = token.token
    const postOptions={
      method:post?'post':'get',
      headers: { 'Content-Type': 'application/json' ,
      "Authorization": "Bearer "+token}
    }
    useEffect(()=>{
    !item&&fetch(apiUrl,postOptions)
      .then(res => res.json())
      .then(
        (result) => {
          setItem(result)
        },
        (error) => {
          setItem("register");
        }
      )});
      return (item&&item)
    }
export default SimpleAuth