import { useState } from "react";
import env from "../../env";
function ReorderModal(props) {
  const [user, setUser] = useState();
  const [showDrop, setShowDrop] = useState();
  const [customers, setCustomers] = useState();
  const token = props.token;

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
  const setPay = (customer) => {
    if (customer.CustomerID) {
      props.setPayValue(3);
    } else {
      props.setPayValue(4);
    }
  };
  return (
    <div className="delete-modal reorder-modal">
      <div className="modal-backdrop show-modal">
        <div className="d-m-box link-box" style={{ backgroundColor: "white" }}>
          <div className="d-m-header">
            <h4>انتخاب مشتری</h4>
            <i
              style={{ color: "black" }}
              class="fa fa-times"
              aria-hidden="true"
              onClick={() => props.setShowReorder("")}
            ></i>
          </div>
          <div className="d-m-content sharif-order-header">
            <div className="nav-bar">
              {user ? (
                <div className="f-customer">
                  <div className="user-item" onClick={() => setShowDrop(1)}>
                    <b>
                      {user.username}
                      {user.agent ? (
                        <></>
                      ) : (
                        <i
                          className="fa-solid fa-check-circle"
                          aria-hidden="true"
                        ></i>
                      )}

                      <small>({user.phone ? user.phone : user.mobile})</small>
                    </b>
                    <small>{user.Address ? user.Address : "-"}</small>
                  </div>
                  <i
                    className="fa-solid fa-remove"
                    style={{ margin: "0", color: "#000" }}
                    onClick={() => setUser("")}
                  ></i>
                </div>
              ) : (
                <div className="f-customer">
                  <input
                    type="search"
                    name=""
                    id="f-search"
                    placeholder="همه"
                    onChange={(e) => findCustomer(e.target.value)}
                    onFocus={() => setShowDrop(1)}
                    onBlur={() => setTimeout(() => setShowDrop(0), 200)}
                  />
                </div>
              )}
              {showDrop ? (
                <div className="f-customer-dropdpwn">
                  {customers &&
                    customers.map((customer, i) => (
                      <div
                        className="menu-item"
                        key={i}
                        onClick={() => (
                          setUser(customer), setShowDrop(0), setPay(customer)
                        )}
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
                            {customer.PostalCode
                              ? customer.PostalCode
                              : "........"}
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
            </div>

            <button>ثبت سفارش</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReorderModal;
