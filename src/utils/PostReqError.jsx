import Cookies from "universal-cookie";
import env from "../env";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import ShowError from "../components/Modal/ShowError";
const PostReqError = async (props) => {
  const cookies = new Cookies();
  const error = ReactDOM.createRoot(document.getElementById("error"));
  const method = props.method ? props.method : "GET";
  const token = cookies.get(env.cookieName);
  const body = props.body;
  const header = {
    "Content-Type": "application/json",
    "x-access-token": token && token.token,
    userid: token && token.userId,
  };
  var color = props.color ? props.color : "lignBlue";
  var icon = props.icon ? props.icon : "info-circle";
  var options =
    method == "GET"
      ? {
          method: "GET",
          headers: header,
        }
      : {
          method: "POST",
          headers: header,
          body: JSON.stringify(body),
        };
  const res = await fetch(env.siteApi + props.url, options)
    .then((res) => res.json())
    .then(
      (result) => {
        if (result.error) {
          error.render(<ShowError text={result.error} color={result.color} />);
          setTimeout(() => error.render(), 3000);
        } else {
          error.render(
            <ShowError text={result.message} color={result.color} />
          );
          setTimeout(() => error.render(), 3000);
          return result;
        }
      },
      (error) => {
        error.render(<ShowError text={error.message} color={error.color} />);
        setTimeout(() => error.render(), 3000);
      }
    );
  return res;
};

export default PostReqError;
