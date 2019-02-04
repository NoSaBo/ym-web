// import Components from "views/Components/Components.jsx";
import LandingPage from "views/LandingPage/LandingPage.jsx";
// import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
// import LoginPage from "views/LoginPage/LoginPage.jsx";
import AdminPage from "views/AdminPage/AdminPage.jsx";
import Employees from "views/AdminPage/Sections/Employees/Index.jsx";
import Branches from "views/AdminPage/Sections/Branches/Index.jsx";
import ServiceShifts from "views/AdminPage/Sections/ServiceShifts/ServiceShifts.jsx";
import Parkings from "views/AdminPage/Sections/Parkings/Index.jsx";
import EmployeexServiceShifts from "views/AdminPage/Sections/EmployeexServiceShifts/Index.jsx";
import Register from "views/AdminPage/Sections/Login/Index.jsx";
// import Login from "views/AdminPage/Sections/Login/Login.jsx";


var indexRoutes = [
  { path: "/", name: "LandingPage", component: LandingPage },
  // { path: "/profile-page", name: "ProfilePage", component: ProfilePage },
  // { path: "/login-page", name: "LoginPage", component: LoginPage },
  // { path: "/components", name: "Components", component: Components },
  { path: "/admin-page/main", name: "AdminPage", component: AdminPage },
  { path: "/admin-page/employees", name: "Employees", component: Employees },
  { path: "/admin-page/branches", name: "Branches", component: Branches },
  {
    path: "/admin-page/serviceshifts",
    name: "ServiceShifts",
    component: ServiceShifts
  },
  { path: "/admin-page/parkings", name: "Parkings", component: Parkings },
  {
    path: "/admin-page/employeexserviceshifts",
    name: "EmployeexServiceShifts",
    component: EmployeexServiceShifts
  },
  { path: "/register", name: "Register", component: Register },
  // { path: "/login", name: "Login", component: Login }
];

export default indexRoutes;
