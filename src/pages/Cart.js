import { useEffect, useState } from 'react'
import SimpleAuth from '../components/simpleAuth'
import env, { siteApi } from '../env'
import BreadCrumb from '../modules/allPages/BreadCrumb'
import CartMainPart from '../modules/CartPage/cartMainPart'
import CartSidePart from '../modules/CartPage/cartSidePart'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const siteWidth = window.innerWidth

function Cart() {
  const token=cookies.get(env.cookieName)
  const [address, setAddress] = useState('')
  const [cart,setCart] = useState()

  const handleClick = () => {
    window.location.replace(env.siteApiUrl + 'category?search=')
  }
  useEffect(() => {
    if (!token) return
    const postOptions = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        "x-access-token":token&&token.token,"userId":token&&token.userId
      },
    }
    fetch(siteApi + "/cart/cart-detail", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result)
          setCart(result.cart)
        },
        (error) => {
          console.log(error)
        }
      )
  }, [])
  console.log(cart)
  return (
    <>
      {token && cart && (
        <main>
          <BreadCrumb pName={'  سبد خرید'} />
          <div className='cartMainHandler'>
            <div className='cartHandler'>
              <h1 className='shoppingCartHeading'>سبد خرید</h1>
              <div className='items-total'>
                {' '}
                مجموع اقلام سبد:{' '}
                {cart &&
                  !cart.error &&
                  cart.data &&
                  cart.length}
                <div>
                  <a href='/category' className='modal-sub-btn-normal'>
                    انتقال به فروشگاه
                  </a>
                </div>
              </div>
              <div className='cartMainPart'>
                <CartMainPart
                  cart={cart}
                />
              </div>
              <div>
                <button
                  onClick={handleClick}
                  type='button'
                  className='promptButton'
                >
                  click me
                </button>
              </div>
            </div>
            <div className='cartSide'>
              <CartSidePart
                cart={cart &&0&& !cart.error && cart.data}
                address={address}
              />
            </div>
          </div>
        </main>
      )}
      {!cart ? (
        <main>لطفا صبر کنید</main>
      ) : (
        !cart.data && <main>سبد خرید خالی است</main>
      )}
      {!token && <main>لطفا وارد سایت شوید</main>}
    </>
  )
}
export default Cart
