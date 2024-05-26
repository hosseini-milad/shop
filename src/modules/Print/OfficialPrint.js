import { normalPriceCount } from "../../env";

var token = JSON.parse(localStorage.getItem('token-lenz'));

function OfficialPrint(props){
    
  const orderInfo = props.orderData
  const userInfo = props.userInfo
  console.log(userInfo)
    return(
        <div className="printArea officialprint">
          <div className="userInfo">
              <div className="hesabfaSection">
              </div>
              <div className="hesabfaSection">
                <h1>صورت حساب فروش کالاو خدمات</h1>
              </div>
              <div className="hesabfaSection hesabfaDate" style={{minWidth: "240px"}}>
                <small>شماره سریال: <b>{orderInfo.Number}</b></small>
                <small> تاریخ: <b>{new Date(orderInfo.Date).toLocaleDateString('fa-IR')}</b></small>
              </div>
            </div>
            <table className="hesabfaTable">
              <tbody>
                <tr className="title">
                <th colSpan={5}>مشخصات فروشنده</th>

                </tr>
                <tr>
                  <td>
                    <table className="hesabfaRow">
                      <tbody>
                        <tr>
                          <td  className="hesabfaItem">
                            <span>نام شخص حقیقی/حقوقی :</span>
                            <strong> {userInfo.username}</strong>
                          </td>
                          <td  className="hesabfaItem">
                            <span>شماره اقتصادي: </span>
                            <strong> {userInfo.phone} </strong>
                          </td>
                          <td  className="hesabfaItem">
                            <span>شماره ثبت /شماره ملی: </span>
                            <strong> {userInfo.phone} </strong>
                          </td>
                          <td  className="hesabfaItem">
                            <span>شناسه ملی: </span>
                            <strong> {userInfo.phone} </strong>
                          </td>
                        </tr>
                        <tr>
                          <td className="hesabfaItem">
                            <span>نشانی: </span>
                            <strong> {userInfo&&userInfo.State}</strong>
                          </td>
                          <td className="hesabfaItem">
                            <span>کدپستی: </span>
                            <strong> {userInfo&&userInfo.PostalCode}</strong>
                          </td>
                          <td className="hesabfaItem">
                            <span>شماره فکس: </span>
                            <strong> {userInfo&&userInfo.City}</strong>
                          </td>
                          <td colSpan={2} className="hesabfaItem">
                            <span>شماره تلفن: </span>
                            <strong> {userInfo&&userInfo.Address}</strong>
                          </td>
                          
                        </tr>
                        <tr>
                          <td className="hesabfaItem">
                            <span>عاملیت فروش: </span>
                            <strong> {userInfo&&userInfo.State}</strong>
                          </td>
                          <td className="hesabfaItem">
                            <div className="site-link">
                              <p>www.sharifoilco.com</p>
                              <i class="fa-brands fa-internet-explorer"></i>
                            </div>
                          </td>
                          <td className="hesabfaItem">
                            <div className="site-link">
                              <p>@oilcosharif</p>
                              <i class="fa-brands fa-instagram"></i>
                              <i class="fa-brands fa-telegram"></i>
                            </div>
                          </td>
                          <td colSpan={2} className="hesabfaItem">
                            <span>شماره خط ویژه: </span>
                            <strong> {userInfo&&userInfo.phone}</strong>
                          </td>
                          
                        </tr>
                        
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr className="title">
                  <th colSpan={5}>مشخصات خریدار</th>

                </tr>
                <tr>
                  <td>
                    <table className="hesabfaRow">
                      <tbody>
                        <tr>
                          <td className="hesabfaItem">
                            <span>نام شخص: </span>
                            <strong> {userInfo.username}</strong>
                          </td>
                          <td className="hesabfaItem">
                            <span>کد مشتری: </span>
                            <strong> {userInfo.phone} </strong>
                          </td>
                          <td className="hesabfaItem">
                            <span>کد نقش: </span>
                            <strong> {userInfo&&userInfo.State}</strong>
                          </td>
                          <td className="hesabfaItem">
                            <span>شماره اقتصادی: </span>
                            <strong> {userInfo&&userInfo.City}</strong>
                          </td>
                          <td className="hesabfaItem">
                            <span>شماره ثبت /شماره ملی: </span>
                            <strong> {userInfo&&userInfo.PostalCode}</strong>
                          </td>
                          
                        </tr>
                        <tr>
                          <td className="hesabfaItem">
                            <span>نشانی کامل استان : </span>
                            <strong> {userInfo&&userInfo.State}</strong>
                          </td>
                          <td className="hesabfaItem">
                            <span> کدپستی: </span>
                            <strong> {userInfo&&userInfo.City}</strong>
                          </td>
                          <td className="hesabfaItem">
                            <span>شهر:</span>
                            <strong> {userInfo&&userInfo.PostalCode}</strong>
                          </td>
                          
                        </tr>
                        <tr>
                          <td className="hesabfaItem">
                            <span>نشانی: </span>
                            <strong> {userInfo&&userInfo.State}</strong>
                          </td>
                          <td className="hesabfaItem">
                            <span> شماره تلفن: </span>
                            <strong> {userInfo&&userInfo.City}</strong>
                          </td>
                          <td className="hesabfaItem">
                            <span>شماره موبایل:</span>
                            <strong> {userInfo&&userInfo.PostalCode}</strong>
                          </td>
                          
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr className="title">
                  <th colSpan={5}>مشخصات کالا یا خدمات مورد معامله</th>

                </tr>

              </tbody>
            </table>
            <table className="hesabfaMainTable">
              <tbody>
                <tr>
                  <th>ردیف</th>
                  <th>هدیه</th>
                  <th>کد کالا</th>
                  <th>شرح کالا / خدمت</th>
                  <th>کارتن</th>
                  <th>واحد اصلی</th>
                  <th>واحد اندازه گیری</th>
                  <th>مبلغ واحد<br/></th>
                  <th>مبلغ کل<br/></th>
                  <th>مبلغ تخفیف<br/></th>
                  <th>مبلغ اضافات<br/></th>
                  <th>مبلغ کل پس از تخفیف و اضافات<br/></th>
                  <th>جمع مالیات و عوارض<br/></th>
                  <th>خالص فاکتور<br/></th>
                  
                </tr>
                {orderInfo&&orderInfo.InvoiceItems&&
                  orderInfo.InvoiceItems.map((items,i)=>(
                <tr key={i}>
                  <td className="centerCell">{i+1}</td>
                  <td className="centerCell">-</td>
                  
                  <td>{items.itemDetail&&items.itemDetail.sku}</td>
                  <td>{items.itemDetail&&items.itemDetail.title}</td>
                  <td className="centerCell">{items.Quantity}</td>
                  <td className="centerCell">واحد</td>
                  <td className="centerCell">{items.Quantity}</td>
                  <td>{normalPriceCount(items.Fee)}</td>
                  <td>{normalPriceCount(items.Price)}</td>
                  <td>تخفیف</td>
                  <td>اضافات</td>
                  <td>جمعشون</td>
                  <td>{normalPriceCount(items.Tax)}</td>
                  <td>{normalPriceCount(items.NetPrice)}</td>
                </tr>))}
                <tr>
                  <td colSpan={8}>
                    <div className="table-total">
                      <p>سی و هفت میلیون و هشتصد و سی هزار ریال</p>
                      <p>جمع کل</p>
                    </div>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>{normalPriceCount(orderInfo.Tax)}</td>
                  <td>{normalPriceCount(orderInfo.NetPrice)}</td>
                </tr>
              </tbody>
            </table>
            <div className="table-footer">
              <div className="footer-row">
                <div className="pay-col">
                  <p>شرایط و نحوه</p>
                  <div className="pay-item">
                    <p>نقدی</p>
                    <span className="pay-checkbox"></span>
                  </div>
                  <div className="pay-item">
                    <p>قراردادی</p>
                    <span className="pay-checkbox"></span>
                  </div>
                  <div className="pay-item">
                    <p>اعتباری</p>
                    <span className="pay-checkbox"></span>
                  </div>
                </div>
                <div className="bill-col">
                  <p>جمع کل حساب شما با احتساب این فاکتور <span>0</span>ریال میباشد</p>
                </div>
              </div>
              <div className="footer-row">
                <div className="bank-col">
                  <p className="title">شماره حسابهاي شرکت روان کاران شریف</p>
                  <div class="account-wrapper">
                    <div className="account-col">
                      <div className="account-item">
                        <p className="ac-name">حساب ملت :</p>
                        <p className="ac-num">5570093050</p>
                      </div>
                      <div className="account-item">
                        <p className="ac-name">حساب سپه :</p>
                        <p className="ac-num">519302175702</p>
                      </div>
                      <div className="account-item">
                        <p className="ac-name">حساب صادرات :</p>
                        <p className="ac-num">0213343979001</p>
                      </div>
                      <div className="account-item">
                        <p className="ac-name">حساب ملی :</p>
                        <p className="ac-num">0110989693003</p>
                      </div>
                    
                    </div>
                    <div className="account-col">
                      <div className="account-item">
                        <p className="ac-name">شماره کارت :</p>
                        <p className="ac-num">6104337851247013</p>
                      </div>
                      <div className="account-item">
                        <p className="ac-name">شماره کارت :</p>
                        <p className="ac-num">5892101150953442</p>
                      </div>
                      <div className="account-item">
                        <p className="ac-name">شماره کارت :</p>
                        <p className="ac-num">6037691990176315</p>
                      </div>
                    </div>
                    <div className="account-col">
                      <div className="account-item">
                        <p className="ac-name">شبا</p>
                        <p className="ac-num"><span>IR</span>540120020000005570093050</p>
                      </div>
                      <div className="account-item">
                        <p className="ac-name">شبا</p>
                        <p className="ac-num"><span>IR</span>330150000000519302175702</p>
                      </div>
                      <div className="account-item">
                        <p className="ac-name">شبا</p>
                        <p className="ac-num"><span>IR</span>530190000000213343979001</p>
                      </div>
                      <div className="account-item">
                        <p className="ac-name">شبا</p>
                        <p className="ac-num"><span>IR</span>480170000000110989693003</p>
                      </div>
                    </div>
                  </div>
                  
                </div>
                <div className="info-col">
                  <span className="float-title">توضیحات</span>
                </div>
              </div>
              <div className="footer-row">
                <div className="sign-col">
                  <p>مهر و امضاي فروشنده</p>
                </div>
                <div className="sign-col">
                  <p>مهر و امضاء خریدار</p>
                </div>
              </div>
            </div>
        </div>
    )

  }

export default OfficialPrint