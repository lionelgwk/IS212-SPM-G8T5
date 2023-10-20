import React from "react";
import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";

const StaffNoPermissionPage = () => {
  return (
    <>
      <Result
        status="404"
        title="Oops!"
        subTitle="Sorry, the page you requested either does not exist or you do not have the permissions to access it."
        extra={<Button className="bg-sky-300 hover:bg-white " ><NavLink to="/staff">Back Home</NavLink></Button>}
      />
    </>
  );
};
export default StaffNoPermissionPage;
