
import { useEffect, useState } from 'react'
import env, { siteApi } from '../env'
import Footer from './Footer'
import Header from './Header'
import SimpleFetch from './simpleFetch'
var token = JSON.parse(localStorage.getItem('token-oil'));
    
function Layout(props){
    const [headerData,setHeaderData] = useState() 
    

    return(
        <>
            <Header/>
            {props.children}
            <Footer />
        </>
    )
}
export default Layout