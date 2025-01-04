import { useState } from "react";
import BankSelect from "../../modules/Orders/Bank/BankSelect";
import env from "../../env";
function BankModal(props) {
  return (
    <div className="delete-modal">
      <div className="modal-backdrop show-modal">
        <div className="d-m-box link-box" style={{ backgroundColor: "white" }}>
          <div className="d-m-header">
            <h4>روش پرداخت</h4>
            <i
              class="fa fa-times"
              aria-hidden="true"
              onClick={() => props.setBankPop("")}
            ></i>
          </div>
          <div className="d-m-content">
            <div className="bank-wrapper">
              <div className="bank-form">
                <BankSelect
                  token={props.token}
                  bankList={props.bankList}
                  order={props.BankPop}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BankModal;
