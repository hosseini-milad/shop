import { useState, useEffect } from "react";
import env, { normalPriceCount, normalArrayRound } from "../../../env";
import BankTable from "./BankTable";
import BankNew from "./َBankNew";
function BankSelect(props) {
  const token = props.token;
  const bankList = props.bankList;
  const user = props.user;
  const order = props.order;
  const [loadBank, setLoadBank] = useState(1);
  const [Amount, setAmount] = useState();
  const [TransData, setTransData] = useState();
  const [TransRemain, setTransRemain] = useState();
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
    fetch(env.siteApi + "/setting/fetch-bank-of-cart", postOptions)
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
    if (props.order) {
      FetchBank();
    } else {
      console.log("object");
      ClearBank();
    }
  }, [props.orders]);
  return (
    <>
      <div>
        {loadBank ? (
          <BankNew
            Amount={Amount}
            setAmount={setAmount}
            totalPrice={props.totalPrice}
            bankList={bankList}
            setTransData={setTransData}
            user={user}
            loadBank={loadBank}
            TransData={TransData}
            setLoadBank={setLoadBank}
            token={token}
            OrderNumList={OrderNumList}
            TransRemain={TransRemain}
            setTransRemain={
              setTransRemain}
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
            totalPrice={props.totalPrice}
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
      </div>
    </>
  );
}
export default BankSelect;
