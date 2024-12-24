import { useState, useEffect, useRef } from "react";
import env, { normalPriceCount, normalPriceRound } from "../../env";
import ErrorActionKey from "../../components/Modal/ErrorActionKey";
import PrintFish from "../../modules/Print/PrintFish";
import { useReactToPrint } from "react-to-print";

function QuickTotal(props) {
  const token = props.token;
  const qCart = props.data;
  const user = props.user;
  const tab = props.tab;
  const [loading, setLoading] = useState(0);
  const [PrintPop, setPrintPop] = useState("");
  const [PopUp, setPopUp] = useState("");
  const focusBtn = useRef();
  const focusPop = useRef();
  var contentRef = useRef();
  const [preKey, setPreKey] = useState("");
  const reactToPrintFn = useReactToPrint({ contentRef });
  useEffect(() => {
    if (!props.action) {
      focusBtn.current && focusBtn.current.focus();
    }
  }, [qCart]);
  //console.log(qCart)
  const SetOrder = (isQuote, print) => {
    setLoading(1);
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({
        userId: user
          ? user.Code
            ? user.Code
            : user._id
          : token && token.userId,
        isQuote,
      }),
    };
    //console.log(postOptions)
    fetch(
      env.siteApi + `/panel/${tab ? "quote" : "faktor"}/quick-to-cart`,
      postOptions
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (!result.error) {
            props.setError({ message: "کالا اضافه شد", color: "green" });
            setTimeout(
              () => props.setError({ message: "", color: "brown" }),
              2000
            );
            props.setCart(result);

            setLoading(0);
            if (print) {
              setPrintPop(result.cart[0].cartNo)
              
              console.log(PrintPop);
              setTimeout(() => {
                reactToPrintFn();
              }, 5000);
            }
          } else {
            props.setError({ message: result.error, color: "brown" });
            setTimeout(
              () => props.setError({ message: "", color: "brown" }),
              5000
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const defAction = () => {
    props.action({ message: "acting" });
  };
  if (!qCart) return <div className="total-amount"></div>;
  else
    return (
      <div className="total-amount">
        <div className="table">
          <div className="t-wrapper">
            <p>تعداد</p>
            <p>{qCart.totalCount}</p>
          </div>
          <div className="t-wrapper">
            <p>مجموع فاکتور</p>
            <p>{normalPriceCount(qCart.totalFee, 1)}</p>
          </div>
          <div className="t-wrapper">
            <p>تخفیف</p>
            <p>
              {normalPriceCount(qCart.totalDiscount.toString().split(".")[0]) ||
                "-"}
            </p>
          </div>
          <div className="t-wrapper">
            <p>مالیات</p>
            <p>{normalPriceRound(qCart.totalTax)}</p>
          </div>
          <div className="t-wrapper">
            <p>مبلغ کل </p>
            <p>{normalPriceRound(qCart.totalPrice)}</p>
          </div>
        </div>

        {props.action ? (
          <></>
        ) : (
          <div className="total-btn-wrapper">
            {loading ? (
              <button className="product-table-btn temp-btn">
                <p>در حال پردازش</p>
              </button>
            ) : props.tab ? (
              <button
                ref={focusBtn}
                onKeyDown={(e) =>
                  e.keyCode === 13
                    ? setPopUp({
                        action: true,
                        title: "ثبت پیش فاکتور",
                        print: false,
                      })
                    : null
                }
                id="add-cart"
                type="button"
                className="product-table-btn temp-btn"
                onClick={() =>
                  setPopUp({
                    action: true,
                    title: "ثبت پیش فاکتور",
                    print: false,
                  })
                }
              >
                <p>ثبت پیش فاکتور</p>
              </button>
            ) : (
              <>
                <button
                  id="add-cart"
                  type="button"
                  className="product-table-btn temp-btn"
                  onClick={() =>
                    setPopUp({
                      action: false,
                      title: "ثبت فاکتور",
                      print: false,
                    })
                  }
                >
                  <p>ثبت فاکتور</p>
                </button>
                <button
                  ref={focusBtn}
                  onKeyDown={(e) =>
                    e.keyCode === 13
                      ? setPopUp({
                          action: false,
                          title: "ثبت فاکتور",
                          print: true,
                        })
                      : null
                  }
                  id="add-cart"
                  type="button"
                  className="product-table-btn temp-btn"
                  onClick={() =>
                    setPopUp({
                      action: false,
                      title: "ثبت فاکتور",
                      print: true,
                    })
                  }
                >
                  <p>ثبت فاکتور و پرینت</p>
                </button>
              </>
            )}
          </div>
        )}
        {PopUp ? (
          <ErrorActionKey
            preKey={preKey}
            setPreKey={setPreKey}
            focusPop={focusPop}
            status={"DELETE"}
            title={PopUp.title}
            text={"آیا از ثبت سفارش مطمئن هستید؟"}
            buttonText="تایید"
            close={() => setPopUp(0)}
            color="orange"
            action={() => SetOrder(PopUp.action, PopUp.print)}
          />
        ) : (
          <></>
        )}
        {PrintPop ? (
          <div className="onlyPrint">
            <div ref={contentRef}>
              <PrintFish url={PrintPop} />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
}
export default QuickTotal;
