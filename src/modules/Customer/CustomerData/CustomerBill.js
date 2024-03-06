function CustomerBill(){
    return(
        <div className="bill-page">
          <div className="plan-col-1">
            <div className="plan-box">
              <h5>Plan</h5>
              <div className="plan-shapes-wrapper">
                <div className="plan-shapes current-plan">
                  <p>basic</p>
                  <p>Free</p>
                </div>
                <div className="plan-shapes">
                  <p>starter</p>
                  <p>4.99<span>/mo</span></p>
                </div>
                <div className="plan-shapes">
                  <p>premium</p>
                  <p>9.99<span>/mo</span></p>
                </div>
              </div>
              <div className="plan-info">
                <div className="plan-row-1">
                  <p>Plan</p>
                  <p>Billing name</p>
                  <p>Billing address</p>
                  <p>Billing phone number</p>
                  <p>Payment method</p>
                </div>
                <div className="plan-row-2">
                  <p>basic</p>
                  <div className="billing-name">Jayvion Simon<i className="fa-solid fa-caret-down fa-2xs"></i></div>
                  <p>19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</p>
                  <p>692-767-2903</p>
                  <div className="pay-method">**** **** **** 5678<i className="fa-solid fa-caret-down fa-2xs"></i></div>
                </div>

              </div>
              <div className="plan-btn-container">
                <div className="cancel-btn">Cancel Plan</div>
                <div className="upgrade-btn">Upgrade Plan</div>
              </div>
            </div>
            <div className="pay-box">
              <div className="pay-title">
                <h5>Payment Method</h5>
                <div className="add-btn">
                  <i className="fa-solid fa-plus fa-xl" style={{color: "#00ba00"}}></i>
                  <p>New Card</p>
                </div>
              </div>
              <div className="pay-card-wrapper">
                <div className="pay-card">
                  <i className="fa-brands fa-cc-mastercard fa-2xl"></i>
                  <p>**** **** **** 1234</p>
                  <i className="fa-solid fa-ellipsis-v fa-lg dot-menu" style={{color: "#7c7c7c"}}></i>
                  <div className="sub-dot-menu">
                    <div className="sap-option dot-option"><i className="fa-solid fa-star"></i>
                      <p>Set as primary</p>
                    </div>
                    <div className="edit-option dot-option"><i className="fa-solid fa-pen"></i>
                      <p>Edit</p>
                    </div>
                    <div className="del-option dot-option"><i className="fa-solid fa-trash" style={{color: "#ff0000"}}></i>
                      <p>Delete</p>
                    </div>
                  </div>

                </div>
                <div className="pay-card">
                  <i className="fa-brands fa-cc-visa fa-2xl"></i>
                  <p>**** **** **** 5678</p>
                  <i className="fa-solid fa-ellipsis-v fa-lg dot-menu" style={{color: "#7c7c7c"}}></i>
                  <div className="sub-dot-menu">
                    <div className="sap-option dot-option"><i className="fa-solid fa-star"></i>
                      <p>Set as primary</p>
                    </div>
                    <div className="edit-option dot-option"><i className="fa-solid fa-pen"></i>
                      <p>Edit</p>
                    </div>
                    <div className="del-option dot-option"><i className="fa-solid fa-trash" style={{color: "#ff0000"}}></i>
                      <p>Delete</p>
                    </div>
                  </div>
                  <span className="pay-default">Default</span>



                </div>
                <div className="pay-card">
                  <i className="fa-brands fa-cc-visa fa-2xl"></i>
                  <p>**** **** **** 7878</p>
                  <i className="fa-solid fa-ellipsis-v fa-lg dot-menu" style={{color: "#7c7c7c"}}></i>
                  <div className="sub-dot-menu">
                    <div className="sap-option dot-option"><i className="fa-solid fa-star"></i>
                      <p>Set as primary</p>
                    </div>
                    <div className="edit-option dot-option"><i className="fa-solid fa-pen"></i>
                      <p>Edit</p>
                    </div>
                    <div className="del-option dot-option"><i className="fa-solid fa-trash" style={{color: "#ff0000"}}></i>
                      <p>Delete</p>
                    </div>
                  </div>


                </div>
              </div>
            </div>
            <div className="address-box">
              <div className="address-title">
                <h5>Address Book</h5>
                <div className="add-btn">
                  <i className="fa-solid fa-plus fa-xl" style={{color: "#00ba00"}}></i>
                  <p>Address</p>
                </div>
              </div>
              <div className="address-card-wrapper">
                <div className="address-card">
                  <p className="address-name">Jayvion Simon<span>(Home)</span></p>
                  <p className="adress-loc">19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</p>
                  <p className="address-num">365-374-4961</p>
                  <i className="fa-solid fa-ellipsis-v fa-lg dot-menu" style={{color: "#7c7c7c"}}></i>
                  <div className="sub-dot-menu">
                    <div className="sap-option dot-option"><i className="fa-solid fa-star"></i>
                      <p>Set as primary</p>
                    </div>
                    <div className="edit-option dot-option"><i className="fa-solid fa-pen"></i>
                      <p>Edit</p>
                    </div>
                    <div className="del-option dot-option"><i className="fa-solid fa-trash" style={{color: "#ff0000"}}></i>
                      <p>Delete</p>
                    </div>
                  </div>
                  <span className="pay-default">Default</span>

                </div>
                <div className="address-card">
                  <p className="address-name">Jayvion Simon<span>(Home)</span></p>
                  <p className="adress-loc">19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</p>
                  <p className="address-num">365-374-4961</p>
                  <i className="fa-solid fa-ellipsis-v fa-lg dot-menu" style={{color: "#7c7c7c"}}></i>
                  <div className="sub-dot-menu">
                    <div className="sap-option dot-option"><i className="fa-solid fa-star"></i>
                      <p>Set as primary</p>
                    </div>
                    <div className="edit-option dot-option"><i className="fa-solid fa-pen"></i>
                      <p>Edit</p>
                    </div>
                    <div className="del-option dot-option"><i className="fa-solid fa-trash" style={{color: "#ff0000"}}></i>
                      <p>Delete</p>
                    </div>
                  </div>
                </div>
                <div className="address-card">
                  <p className="address-name">Jayvion Simon<span>(Home)</span></p>
                  <p className="adress-loc">19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</p>
                  <p className="address-num">365-374-4961</p>
                  <i className="fa-solid fa-ellipsis-v fa-lg dot-menu" style={{color: "#7c7c7c"}}></i>
                  <div className="sub-dot-menu">
                    <div className="sap-option dot-option"><i className="fa-solid fa-star"></i>
                      <p>Set as primary</p>
                    </div>
                    <div className="edit-option dot-option"><i className="fa-solid fa-pen"></i>
                      <p>Edit</p>
                    </div>
                    <div className="del-option dot-option"><i className="fa-solid fa-trash" style={{color: "#ff0000"}}></i>
                      <p>Delete</p>
                    </div>
                  </div>
                </div>
                <div className="address-card">
                  <p className="address-name">Jayvion Simon<span>(Home)</span></p>
                  <p className="adress-loc">19034 Verna Unions Apt. 164 - Honolulu, RI / 87535</p>
                  <p className="address-num">365-374-4961</p>
                  <i className="fa-solid fa-ellipsis-v fa-lg dot-menu" style={{color: "#7c7c7c"}}></i>
                  <div className="sub-dot-menu">
                    <div className="sap-option dot-option"><i className="fa-solid fa-star"></i>
                      <p>Set as primary</p>
                    </div>
                    <div className="edit-option dot-option"><i className="fa-solid fa-pen"></i>
                      <p>Edit</p>
                    </div>
                    <div className="del-option dot-option"><i className="fa-solid fa-trash" style={{color: "#ff0000"}}></i>
                      <p>Delete</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className="plan-col-2">
            <div className="invoice-box">
              <h5>Invoice History</h5>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div className="inv-name">
                        <p>INV-1990</p>
                        <p>17 Oct 2023</p>
                      </div>
                    </td>
                    <td>
                      <div className="inv-price">$83.74</div>
                    </td>
                    <td>
                      <div className="inv-pdf">Pdf</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="inv-name">
                        <p>INV-1990</p>
                        <p>17 Oct 2023</p>
                      </div>
                    </td>
                    <td>
                      <div className="inv-price">$83.74</div>
                    </td>
                    <td>
                      <div className="inv-pdf">Pdf</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="inv-name">
                        <p>INV-1990</p>
                        <p>17 Oct 2023</p>
                      </div>
                    </td>
                    <td>
                      <div className="inv-price">$83.74</div>
                    </td>
                    <td>
                      <div className="inv-pdf">Pdf</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="inv-name">
                        <p>INV-1990</p>
                        <p>17 Oct 2023</p>
                      </div>
                    </td>
                    <td>
                      <div className="inv-price">$83.74</div>
                    </td>
                    <td>
                      <div className="inv-pdf">Pdf</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="inv-name">
                        <p>INV-1990</p>
                        <p>17 Oct 2023</p>
                      </div>
                    </td>
                    <td>
                      <div className="inv-price">$83.74</div>
                    </td>
                    <td>
                      <div className="inv-pdf">Pdf</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="inv-name">
                        <p>INV-1990</p>
                        <p>17 Oct 2023</p>
                      </div>
                    </td>
                    <td>
                      <div className="inv-price">$83.74</div>
                    </td>
                    <td>
                      <div className="inv-pdf">Pdf</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="inv-name">
                        <p>INV-1990</p>
                        <p>17 Oct 2023</p>
                      </div>
                    </td>
                    <td>
                      <div className="inv-price">$83.74</div>
                    </td>
                    <td>
                      <div className="inv-pdf">Pdf</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="inv-name">
                        <p>INV-1990</p>
                        <p>17 Oct 2023</p>
                      </div>
                    </td>
                    <td>
                      <div className="inv-price">$83.74</div>
                    </td>
                    <td>
                      <div className="inv-pdf">Pdf</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="inv-name">
                        <p>INV-1990</p>
                        <p>17 Oct 2023</p>
                      </div>
                    </td>
                    <td>
                      <div className="inv-price">$83.74</div>
                    </td>
                    <td>
                      <div className="inv-pdf">Pdf</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="inv-name">
                        <p>INV-1990</p>
                        <p>17 Oct 2023</p>
                      </div>
                    </td>
                    <td>
                      <div className="inv-price">$83.74</div>
                    </td>
                    <td>
                      <div className="inv-pdf">Pdf</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="inv-name">
                        <p>INV-1990</p>
                        <p>17 Oct 2023</p>
                      </div>
                    </td>
                    <td>
                      <div className="inv-price">$83.74</div>
                    </td>
                    <td>
                      <div className="inv-pdf">Pdf</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
          </div>
        </div>
    )
}
export default CustomerBill