import { useState } from "react";
import env from "../../env";
import PostReq from "../../utils/PostReq";
function ReorderModal(props) {
  const [user, setUser] = useState();
  const [showDrop, setShowDrop] = useState();
  const [customers, setCustomers] = useState();
  const token = props.token;

  const setPay = (customer) => {
    if (customer.CustomerID) {
      props.setPayValue(3);
    } else {
      props.setPayValue(4);
    }
  };
  const SearchCustomer = async (search) => {
    if (!search || search.length < 3) return;
    const result = await PostReq({
      method: "Post",
      url: "/panel/faktor/customer-find",
      body: { search: search },
    });
    setCustomers(result);
  };
  const ReOrder = async (search) => {
    const result = await PostReq({
      method: "Post",
      url: "/panel/faktor/copy-quote",
      body: { cartNo: props.cartNo, userId: user._id },
    });
    setTimeout(() => window.location.reload(), 2000);
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
                    onChange={(e) => SearchCustomer(e.target.value)}
                    onFocus={() => setShowDrop(1)}
                    onBlur={() => setTimeout(() => setShowDrop(0), 200)}
                  />
                </div>
              )}
              {showDrop ? (
                <div className="f-customer-dropdpwn">
                  {customers &&
                    customers.customers &&
                    customers.customers.map((customer, i) => (
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

            <button onClick={ReOrder}>ثبت سفارش</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReorderModal;
