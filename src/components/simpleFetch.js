import {useState, useEffect } from "react";
var loading = '';
function SimpleFetch(apiUrl,body){
    const [item, setItem] = useState('')
    const postOptions={
      method:body?'post':'get',
      headers: { 'Content-Type': 'application/json' },
        body:  body&&body
    }
    !item&&fetch(apiUrl,postOptions)
      .then(res => res.json())
      .then(
        (result) => {
          loading = (result)
          setItem(result)
          //body&&console.log(result)
        },
        (error) => {
          loading = (error)
          console.log(error);
        }
      )
      if(loading)return(item)
    }
export default SimpleFetch