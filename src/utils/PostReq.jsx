import Cookies from "universal-cookie";
import env from "../env";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import ShowError from "../components/Modal/ShowError";
const PostReq = async (props) => {
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

  var options =
    method == "GET"
      ? {
          method: "GET",
          headers: header,
        }
      : method == "DELETE"
      ? {
          method: "DELETE",
          headers: header,
          body: JSON.stringify(body),
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
          if (result.message) {
            error.render(
              <ShowError text={result.message} color={result.color} />
            );
            setTimeout(() => error.render(), 3000);
          }

          return result;
        }
      },
      (err) => {
        if (err.status == "404") {
          error.render(<ShowError text={"404"} color={err.color} />);
          setTimeout(() => error.render(), 3000);
        } else {
          error.render(<ShowError text={err.message} color={err.color} />);
          setTimeout(() => error.render(), 3000);
        }
      }
    );
  return res;
};

export default PostReq;
