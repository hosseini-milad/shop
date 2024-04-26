import { useState } from "react";
import Cookies from "universal-cookie";
import env from "../env";

import errortrans from "../translate/error";
import Configuration from "./Configuration";
import Setting from "./Setting";

const Header = (props) => {
  const cookies = new Cookies();
  const [configure, setConfigure] = useState(0);
  const [setting, setSetting] = useState(0);
  const token = cookies.get(env.cookieName) || 1;
  const lang = props.lang ? props.lang.lang : errortrans.defaultLang;
  const logOff = () => {
    cookies.remove(env.cookieName, { path: "/" });
    setTimeout(() => (document.location.reload(), 500));
  };
  return (
    <nav
      className="navbar topMenu navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
      style={{ direction: props.lang.dir }}
      id="navbarBlur"
      data-scroll="true"
    >
      <div className="container-fluid py-1 px-3">
        <nav className="collapseMenu nav-item d-xl-none ps-3 d-flex align-items-center">
          <a
            href="#"
            className="nav-link text-body p-0"
            id="iconNavbarSidenav"
            onClick={() => props.setPinMenu(props.pinMenu ? 0 : 1)}
          >
            <div className="sidenav-toggler-inner">
              <i className="sidenav-toggler-line"></i>
              <i className="sidenav-toggler-line"></i>
              <i className="sidenav-toggler-line"></i>
            </div>
          </a>
        </nav>
        <nav aria-label="breadcrumb" className="hideMobile"></nav>
        <div
          className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
          id="navbar"
        >
          <div className="d-flex align-items-center hideMobile">
            <div className="input-group input-group-outline">
              <label className="form-label">{errortrans.typeHere[lang]}</label>
              <input type="text" className="form-control" />
            </div>
          </div>
          <ul
            className={`${
              props.lang.dir === "ltr" ? "ms-md-auto" : "ms-md-right"
            } navbar-nav  justify-content-end`}
          >
            <li className="nav-item d-flex align-items-center hideMobile">
              <a
                className="btn btn-outline-primary btn-sm mb-0 me-3"
                target="_blank"
                href="https://psyum.3cx.eu:5443/ahmad"
              >
                {errortrans.support[lang]}
              </a>
            </li>
            <li className="nav-item d-flex align-items-center">
              <a
                href="#"
                className="nav-link text-body p-0"
                onClick={() => setSetting(1)}
              >
                <i className="fa fa-wrench fixed-plugin-button-nav cursor-pointer"></i>
              </a>
            </li>

            <li className="nav-item d-flex align-items-center">
              <a
                href="#"
                className="nav-link text-body p-0"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-bell cursor-pointer"></i>
              </a>
              <ul
                className="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4"
                aria-labelledby="dropdownMenuButton"
              >
                <li className="mb-2">
                  <a className="dropdown-item border-radius-md" href="#">
                    <div className="d-flex py-1">
                      <div className="my-auto">
                        <img
                          src="../assets/img/team-2.jpg"
                          className="avatar avatar-sm  me-3 "
                        />
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          <span className="font-weight-bold">New message</span>{" "}
                          from Laur
                        </h6>
                        <p className="text-xs text-secondary mb-0">
                          <i className="fa fa-clock me-1"></i>
                          13 minutes ago
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="mb-2">
                  <a className="dropdown-item border-radius-md" href="#">
                    <div className="d-flex py-1">
                      <div className="my-auto">
                        <img
                          src="../assets/img/small-logos/logo-spotify.svg"
                          className="avatar avatar-sm bg-gradient-dark  me-3 "
                        />
                      </div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          <span className="font-weight-bold">New album</span> by
                          Travis Scott
                        </h6>
                        <p className="text-xs text-secondary mb-0">
                          <i className="fa fa-clock me-1"></i>1 day
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item border-radius-md" href="#">
                    <div className="d-flex py-1">
                      <div className="avatar avatar-sm bg-gradient-secondary  me-3  my-auto"></div>
                      <div className="d-flex flex-column justify-content-center">
                        <h6 className="text-sm font-weight-normal mb-1">
                          Payment successfully completed
                        </h6>
                        <p className="text-xs text-secondary mb-0">
                          <i className="fa fa-clock me-1"></i>2 days
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item d-flex align-items-center">
              <a href="#" className="nav-link text-body font-weight-bold px-0">
                <i className="fa fa-user me-sm-1"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Configuration show={configure} setConfigure={setConfigure} />
      <Setting show={setting} setSetting={setSetting} lang={lang} />
    </nav>
  );
};
export default Header;
