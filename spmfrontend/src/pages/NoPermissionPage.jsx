import React, { useState, useEffect } from "react";
import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";

const NoPermissionPage = () => {
  const [position, setPosition] = useState("");

  useEffect(() => {
    if (localStorage.getItem("position")) {
      setPosition(localStorage.getItem("position"));
    } else {
      setPosition("login");
    }
  });

  return (
    <>
      <Result
        status="404"
        title="Oops!"
        subTitle="Sorry, the page you requested either does not exist or you do not have the permissions to access it."
        extra={
          <Button className="bg-sky-300 hover:bg-white ">
            <NavLink to={`/${position}`}>
              {position == "login" ? (
                <span>Back to Login</span>
              ) : (
                <span>Back Home</span>
              )}
            </NavLink>
          </Button>
        }
      />
    </>
  );
};
export default NoPermissionPage;
