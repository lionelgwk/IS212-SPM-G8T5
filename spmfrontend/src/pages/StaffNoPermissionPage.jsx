import React from "react";

const StaffNoPermissionPage = () => {
    return(
        <div>
            <h1>Oops, you might not have permissions to the view that page.</h1>
            <h2>Click <a href="/staff">here</a> to return to home</h2>
        </div>
    );
};
export default StaffNoPermissionPage;