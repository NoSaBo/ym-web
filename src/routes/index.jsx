import Components from "views/Components/Components.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import AdminPage from "views/AdminPage/AdminPage.jsx";
import Employees from "views/AdminPage/Sections/Employees.jsx";

var indexRoutes = [
  { path: "/", name: "LandingPage", component: LandingPage },
  { path: "/profile-page", name: "ProfilePage", component: ProfilePage },
  { path: "/login-page", name: "LoginPage", component: LoginPage },
  { path: "/components", name: "Components", component: Components },
  { path: "/admin-page", name:"AdminPage", component: AdminPage },
  { path: "/admin-page/employees", name:"Employees", component: Employees },
];

export default indexRoutes;
