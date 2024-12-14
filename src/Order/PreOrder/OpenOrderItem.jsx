import { useState, useRef } from "react";
import {
  PriceDiscountTax,
  TAX,
  normalPriceCount,
  normalPriceRound,
} from "../../env";
import env from "../../env";
import LinkModal from "../../components/Modal/LinkModal";
import ErrorAction from "../../components/Modal/ErrorAction";
// import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import PrintFish from "../../modules/Print/PrintFish";
function OpenOrderItem(props) {
  const token = props.token;
  const user = props.user;
  const data = props.data;
  const setCart = props.setCart;
  const total = props.total && props.total[props.index];
  const [showDetail, setDetail] = useState(0);
  const [changes, setChanges] = useState();
  const [active, setActive] = useState(0);
  const [checkState, setCheckState] = useState(0);
  const [LinkShare, setLinkShare] = useState("");
  const [showRemove, setShowRemove] = useState(0);
  var contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });
  const updateField = (cartNo, id) => {
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
        cartNo: cartNo,
        cartID: id,
        changes,
      }),
    };

    fetch(env.siteApi + "/panel/faktor/update-Item-cart", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const updateCheckBox = (field, action) => {
    setCheckState(action ? false : true);
    if (!action) {
      if (props.order) {
        var index = props.selectedOrder && props.selectedOrder.length;
        props.setOrders((existingItems) => {
          return [
            ...existingItems.slice(0, index),
            field,
            ...existingItems.slice(index + 1),
          ];
        });
      } else {
        props.setOrders([...props.orders, field]);
      }
    } else {
      //const cartNo = e.target.getAttribute("cartNo")
      props.setOrders((l) => l.filter((item) => item !== field));
    }
  };
  const CreateLink = () => {
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({ cartNo: data.cartNo }),
    };
    fetch(env.siteApi + "/panel/faktor/create-public-link", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setLinkShare("/public-print/" + data.cartNo);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const deleteOrder = (orderNo) => {
    //console.log("cart-delete",orderNo)
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({ cartID: orderNo }),
    };
    fetch(env.siteApi + "/panel/faktor/cart-delete", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
          } else {
            setTimeout(() => props.close(), 3000);
            window.location.reload();
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className="order-wrapper">
      <div className="border-title">
        {!data.InvoiceID && data.official ? (
          <div
            className={checkState ? "orderCheck activeCheck" : "orderCheck"}
            onClick={() => updateCheckBox(data.cartNo, checkState)}
          >
            <i className="fa fa-check"></i>
          </div>
        ) : (
          <></>
        )}
        {data.InvoiceID && (
          <div className="orderCheck activeCheck little-check">
            <i className="fa fa-check"></i>
          </div>
        )}
        <div
          className="bu-name"
          onClick={() => (showDetail ? setDetail(0) : setDetail(1))}
        >
          {data.userData ? (
            <div className="col">
              <p>
                {data.userData ? data.userData.username : "-"}
                {data.userData.agent ? (
                  <></>
                ) : (
                  <i
                    className="fa-solid fa-check-circle blue-check"
                    aria-hidden="true"
                  ></i>
                )}
              </p>

              <span>
                {data.userData.phone ? data.userData.phone : "----------"}
                <i className="fa-solid fa-phone no-font" aria-hidden="true"></i>
              </span>
            </div>
          ) : (
            <></>
          )}
          {data.userData ? (
            <div className="col">
              <small>{data.userData ? data.userData.Address : "-"}</small>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="newCol">
          <p>
            شماره سفارش:
            <br />
            {data.cartNo}
          </p>
        </div>
        <div className="newCol">
          <small>
            مبلغ کل:{" "}
            <strong>{total ? normalPriceRound(total.totalPrice) : "-"}</strong>
          </small>
          <div className="col">
            <p>تعداد: {total ? total.totalCount : 1}</p>
          </div>
        </div>
        <div className="newCol">
          <small>
            تاریخ: {new Date(data.progressDate).toLocaleDateString("fa")}
          </small>
          <small>
            ساعت: {new Date(data.progressDate).toLocaleTimeString("fa")}
          </small>
        </div>
        <div className="newCol">
          {data.description ? <small>توضیحات: </small> : <></>}
          <small>{data.description}</small>
        </div>
        <div className="btn-wrapper">
          <i
            className="tableIcon fas fa-print"
            onClick={() =>
              window.open("/orders/print/" + data.cartNo, "_blank")
            }
          ></i>
          <i
            className="tableIcon fas fa-paper-plane"
            onClick={() => CreateLink()}
          ></i>

          <i className="tableIcon fas fa-tag" onClick={reactToPrintFn}></i>

          {!data.InvoiceID &&(<button
            type="button"
            className="btn-crm btn-orderItem"
            onClick={() => setShowRemove(data.cartNo)}
          >
            <p>لغو سفارش</p>
          </button>)}
        </div>

        <i
          className={
            showDetail ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"
          }
        ></i>
      </div>
      {showDetail ? (
        <div className="product-table-sec display-on height-on">
          <table>
            <thead>
              <tr>
                <th data-cell="ردیف">
                  <p>ردیف</p>
                </th>
                <th data-cell="شرح کالا">
                  <p>شرح کالا</p>
                </th>
                <th data-cell="واحد اصلی">
                  <p>واحد اصلی</p>
                </th>
                <th data-cell="مبلغ واحد">
                  <p>مبلغ واحد</p>
                </th>
                <th data-cell="تخفیف">
                  <p>تخفیف</p>
                </th>
                <th data-cell="مالیات">
                  <p>مالیات</p>
                </th>
                <th data-cell="مبلغ کل">
                  <p>مبلغ کل</p>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.cartItems &&
                data.cartItems.map((item, i) => (
                  <tr key={i}>
                    <td data-cell="ردیف">
                      <p>{i + 1}</p>
                    </td>
                    <td data-cell="شرح کالا">
                      <div className="product-title">
                        <img
                          src={
                            item.productData.imageUrl
                              ? env.siteApiUrl + item.productData.imageUrl
                              : "/img/business/oil1.png"
                          }
                          alt="product"
                        />
                        <div className="product-name">
                          <p className="name">{item.title}</p>
                          <p className="email">{item.sku}</p>
                        </div>
                      </div>
                    </td>
                    {/*<td data-cell="کد کالا">
                    <p>{item.sku}</p>
                </td>
                  <td data-cell="کارتن">
                    <p>0</p>
                  </td>*/}
                    <td data-cell="واحد اصلی">
                      <p>{item.count}</p>
                    </td>
                    <td data-cell="مبلغ واحد">
                      <p>{normalPriceRound(item.total && item.total.price)}</p>
                    </td>
                    <td data-cell="تخفیف">
                      <p>
                        {normalPriceRound(item.total && item.total.discount)}
                        <sub>
                          {item.discount < 100
                            ? "(" + item.discount + "%)"
                            : ""}
                        </sub>
                      </p>
                    </td>
                    <td data-cell="مالیات">
                      <p>{normalPriceRound(item.total && item.total.tax)}</p>
                    </td>
                    <td data-cell="مبلغ کل">
                      <p>{normalPriceRound(item.total && item.total.total)}</p>
                    </td>
                    <td>
                      {!data.InvoiceID && (
                        <div className="more-btn" style={{ gap: 0 }}>
                          <input
                            type="number"
                            onChange={(e) =>
                              setChanges((prevState) => ({
                                ...prevState,
                                count: (item.count - e.target.value).toString(),
                              }))
                            }
                          />
                          <button
                            onClick={() => updateField(data.cartNo, item.id)}
                          >
                            <p>بازگشت از سفارش</p>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}
      {LinkShare ? (
        <LinkModal LinkShare={LinkShare} setLinkShare={setLinkShare} />
      ) : (
        <></>
      )}
      <div className="onlyPrint">
        <div ref={contentRef}>
          <PrintFish url={data.cartNo} />
        </div>
      </div>
      {showRemove ? (
        <ErrorAction
          status={"DELETE"}
          title={"لغو سفارش"}
          text={"سفارش لغو خواهد شد. آیا مطمئن هستید؟"}
          linkText={""}
          style={{ direction: "rtl" }}
          buttonText="حذف"
          close={() => setShowRemove(0)}
          color="red"
          action={() => deleteOrder(showRemove)}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
export default OpenOrderItem;
