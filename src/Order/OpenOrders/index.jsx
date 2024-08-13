import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import LocalPrintshopRoundedIcon from "@mui/icons-material/LocalPrintshopRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Confirmation from "./components/confirmation";
import "./style.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const OpenOrders = () => {
  const navigate = useNavigate();
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const cancelConfirmation = () => {
    console.log("close confirmation");
    setOpenConfirmation(false);
  };
  const accepted = () => {
    console.log("accepted");
  };
  const backToOrders = () => {
    navigate("/orders/business");
  };
  return (
    <Container maxWidth="lg">
      <Box sx={{ height: "100vh", direction: "rtl" }}>
        <div className="user wrapper-open-orders">
          <section className="wrapper-open-orders__header">
            <section className="title"> لیست سفارشات باز</section>
            <span
              className="back cursor-pointer"
              onClick={() => backToOrders()}
            >
              <ArrowBackIcon />
            </span>
          </section>
          <div className="list-container">
            <div className="user-list">
              <table>
                <thead>
                  <tr>
                    <th className="selected"></th>
                    <th className="customer">
                      <span>مشتری</span>
                    </th>
                    <th className="register-date">
                      <span>تاریخ ثبت</span>
                    </th>
                    <th className="price">
                      <span>مبلغ</span>
                    </th>
                    <th className="count">
                      <span>تعداد</span>
                    </th>
                    <th className="action">
                      <span>عملیات</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="checkBoxStyle selected">
                      <input type="checkbox" name="" id="" />
                    </td>
                    <td className="customer">
                      <div className="cu-avatar">
                        <img src="/img/avatar/avatar_1.jpg" alt="avatar" />
                        <div className="cu-name">
                          <p className="name">33</p>
                          <p className="email">کد مشتری: </p>
                        </div>
                      </div>
                    </td>
                    <td className="register-date">
                      <span>11</span>
                    </td>
                    <td className="price">
                      <span>11</span>
                    </td>
                    <td className="count">
                      <span>11</span>
                    </td>
                    <td className="action">
                      <DeleteRoundedIcon
                        onClick={() => setOpenConfirmation(true)}
                        className="icon-color remove-single-order"
                      />
                      <LocalPrintshopRoundedIcon className="icon-color" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Confirmation
            open={openConfirmation}
            cancelConfirmation={cancelConfirmation}
            accepted={accepted}
            title="هشدار"
            description="آیا مطمئن هستید که می خواید این سفارش را حذف کنید ؟"
          />
        </div>
      </Box>
    </Container>
  );
};

export default OpenOrders;
