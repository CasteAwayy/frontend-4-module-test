import { Outlet } from "react-router-dom";

function AppLayout() {
    return (
        <div className="social_app">
            <h1 className="hero__heading">Social Media App</h1>
            <Outlet />
        </div>
    );
}

export default AppLayout;
