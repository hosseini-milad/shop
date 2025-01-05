import { useState, useEffect } from "react";
import env, { normalPriceCount, normalArrayRound } from "../../../env";
import BankTable from "./BankTable";
import BankNew from "./َBankNew";
function BankSelect(props) {
  const token = props.token;
  const bankList = props.bankList;
  const user = props.user;
  const order = props.order;
  const [SepidarLoad, setSepidarLoad] = useState();
  const [loadBank, setLoadBank] = useState(1);
  const [Amount, setAmount] = useState();
  const [TransData, setTransData] = useState();
  const [TransRemain, setTransRemain] = useState();
  const [Error, setError] = useState();
  const OrderNumList = useEffect(() => {
    if (TransData) {
      setLoadBank(0);
      setTimeout(() => setLoadBank(1), 100);
    }
  }, [TransData]);
  const FetchBank = () => {
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({ ...order }),
    };
    fetch(env.siteApi + "/setting/fetch-bank-of-faktor", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
          } else {
            setTransData(result.transData);
            setAmount(result.transRemain);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const SubmitBank = () => {
    setSepidarLoad(0);
    const postOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
      body: JSON.stringify({ ...order }),
    };
    fetch(env.siteApi + "/setting/reg-sanad-sepidar", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.error) {
            console.log("error");
            setSepidarLoad(1);
            setError(result.error);
          } else {
            console.log("done");
            setSepidarLoad(1);
          }
        },
        (error) => {
          console.log(error);
          setSepidarLoad(1);
        }
      );
  };
  const ClearBank = () => {
    const postOptions = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token && token.token,
        userId: token && token.userId,
      },
    };
    fetch(env.siteApi + "/setting/clear-bank-of-cart", postOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setTransData("");
        },
        (error) => {
          console.log(error);
        }
      );
  };
  useEffect(() => {
    FetchBank();
  }, [props.order]);
  return (
    <>
      <div>
        {loadBank ? (
          <BankNew
            Amount={Amount}
            setAmount={setAmount}
            Total={order.Total}
            bankList={bankList}
            setTransData={setTransData}
            user={user}
            loadBank={loadBank}
            TransData={TransData}
            setLoadBank={setLoadBank}
            token={token}
            order={order}
            TransRemain={TransRemain}
            setTransRemain={setTransRemain}
          />
        ) : (
          <></>
        )}
        {Amount && (
          <div className="amount">
            <p>
              جمع پرداختی:{" "}
              {Amount.totalPay && normalPriceCount(Amount.totalPay)}
            </p>
            <p>
              باقی مانده: {Amount.remain && normalPriceCount(Amount.remain)}
            </p>
          </div>
        )}
        {TransData ? (
          <BankTable
            Total={order.Total}
            Amount={Amount}
            setAmount={setAmount}
            TransData={TransData}
            setTransData={setTransData}
            user={user}
            token={token}
          />
        ) : (
          <></>
        )}
        {Amount && Amount.remain <= "0" ? (
          SepidarLoad ? (
            <button className="bank-submit">درحال پردازش </button>
          ) : (
            <button className="bank-submit" onClick={SubmitBank}>
              ثبت رسید
            </button>
          )
        ) : (
          <></>
        )}
        {Error ? <p style={{ color: "red" }}>{Error}</p> : <></>}
      </div>
    </>
  );
}
export default BankSelect;
