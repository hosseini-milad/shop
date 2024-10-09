import { useEffect, useState } from "react";
import env from "../../env";
import ManageUser from "./ManageUser";
import { useNavigate } from "react-router-dom";

function OrderHeader(props) {
  const navigate = useNavigate();
  const token = props.token;
  const [showDrop, setShowDrop] = useState(0);
  const [showUsers, setShowUsers] = useState(0);
  const updateGrid = (value) => {
    props.setGrid(value);
    var shopVar = JSON.parse(localStorage.getItem(env.shopExpert));
    shopVar
      ? localStorage.setItem(
          env.shopExpert,
          JSON.stringify({
            ...shopVar,
            grid: value,
          })
        )
      : localStorage.setItem(
          env.shopExpert,
          JSON.stringify({
            grid: value,
          }) 
        );
  };
  const [customers, setCustomers] = useState();
  
  const findCustomer = (search) => {
    if (search.length < 3) {
      //setShowPop(0)
      return;
    }
    //console.log(search)
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({ search: search }),
    };
    fetch(env.siteApi + "/panel/faktor/customer-find", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.customers)
            if (result.error) {
              props.setError({ message: result.error, color: "brown" });
            } else {
              setCustomers(result.customers);
            }
        },
        (error) => {
          console.log(error);
        }
      );
  };
  return (
    <div className="nav-bar">
      <p>سفارشات</p>
      {props.user ? (
        <div className="f-customer">
          <div className="user-item">
            <b>
              {props.user.username}
              {props.user.agent ? (
                <></>
              ) : (
                <i className="fa-solid fa-check-circle" aria-hidden="true"></i>
              )}

              <small>
                ({props.user.phone ? props.user.phone : props.user.mobile})
              </small>
            </b>
            <small>{props.user.Address ? props.user.Address : "-"}</small>
          </div>
          <i
            className="fa-solid fa-remove"
            style={{ margin: "0", color: "#000" }}
            onClick={() => props.setUser("")}
          ></i>
        </div>
      ) : (
        <div className="f-customer">
          <input
            type="search"
            name=""
            id="f-search"
            placeholder="مشتری"
            onChange={(e) => findCustomer(e.target.value)}
            onFocus={() => setShowDrop(1)}
            onBlur={() => setTimeout(() => setShowDrop(0), 200)}
          />
          <i
            className="fa-solid fa-plus"
            style={{ margin: "0", color: "#000" }}
            onClick={() => setShowUsers(1)}
          ></i>
        </div>
      )}
      {/*<button onClick={() => gotToOpenOrders()} className="view-open-order">
        سفارشهای باز
      </button>*/}
      <div className="view-btn-wrapper">
        <label
          htmlFor="list-view"
          className={props.grid ? "list-btn view-active" : "list-btn"}
          onClick={() => updateGrid(1)}
        >
          <i className="fa-solid fa-list no-font"></i>
        </label>
        <input type="radio" name="view" id="list-view" />
        <label
          htmlFor="tile-view"
          className={props.grid ? "tile-btn" : "tile-btn view-active"}
          onClick={() => updateGrid(0)}
        >
          <i className="fa-solid fa-table no-font"></i>
        </label>
        <input type="radio" name="view" id="tile-view" />
      </div>
      {showDrop ? (
        <div className="f-customer-dropdpwn">
          {customers &&
            customers.map((customer, i) => (
              <div
                className="menu-item"
                key={i}
                onClick={() => props.setUser(customer)}
              >
                <p className="bu-name">
                  {customer.username}

                  {customer.agent ? (
                    <></>
                  ) : (
                    <i
                      className="fa-solid fa-check-circle"
                      aria-hidden="true"
                    ></i>
                  )}
                </p>
                <div className="info-holder col">
                  <span>
                    <i
                      className="fa-solid fa-credit-card no-font id-icon"
                      aria-hidden="true"
                    ></i>
                    {customer.meliCode ? customer.meliCode : "........"}
                  </span>
                  <span>
                    <i
                      className="fa-solid fa-phone no-font id-icon"
                      aria-hidden="true"
                    ></i>
                    {customer.phone ? customer.phone : "........"}
                  </span>
                  <span>
                    <i
                      className="fa-solid fa-certificate no-font id-icon"
                      aria-hidden="true"
                    ></i>
                    {customer.roleId ? customer.roleId : "........"}
                  </span>
                  <span>
                    <i
                      className="fa-solid fa-location-arrow no-font id-icon"
                      aria-hidden="true"
                    ></i>
                    {customer.PostalCode ? customer.PostalCode : "........"}
                  </span>
                </div>
                <p className="bu-address">
                  {customer.Address ? customer.Address : "-"}
                </p>
              </div>
            ))}
        </div>
      ) : (
        <></>
      )}
      {showUsers?<ManageUser show={showUsers} close={() => setShowUsers(0)} />:<></>}
    </div>
  );
}
export default OrderHeader;
