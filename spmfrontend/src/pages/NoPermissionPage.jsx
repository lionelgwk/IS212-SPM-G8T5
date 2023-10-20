import React, { useState, useEffect } from "react";
import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";

const NoPermissionPage = () => {

  const [position, setPosition] = useState("");

  useEffect(() => {
    setPosition(localStorage.getItem("position"));
  });

  return (
    <>
      <Result
        status="404"
        title="Oops!"
        subTitle="Sorry, the page you requested either does not exist or you do not have the permissions to access it."
        extra={
          <Button className="bg-sky-300 hover:bg-white ">
            <NavLink to={`/${position}`}>Back Home</NavLink>
          </Button>
        }
      />
    </>
  );
};
export default NoPermissionPage;
