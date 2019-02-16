import LandingPage from "views/LandingPage/LandingPage.jsx";
import ParkeoPage from "views/ParkeoPage/ParkeoPage.jsx";
import AdminPage from "views/AdminPage/AdminPage.jsx";
import Employees from "views/AdminPage/Sections/Employees/Index.jsx";
import Branches from "views/AdminPage/Sections/Branches/Index.jsx";
import ServiceShifts from "views/AdminPage/Sections/ServiceShifts/Index.jsx";
import Parkings from "views/AdminPage/Sections/Parkings/Index.jsx";
import EmployeexServiceShifts from "views/AdminPage/Sections/EmployeexServiceShifts/Index.jsx";
import Test from "views/AdminPage/Sections/Test/Index.jsx";


var indexRoutes = [
  { path: "/", name: "LandingPage", component: LandingPage },
  { path: "/parkeo", name: "ParkeoPage", component: ParkeoPage },

  { path: "/parkeo/admin-page", name: "AdminPage", component: AdminPage },
  {
    path: "/parkeo/admin-page/employees",
    name: "Employees",
    component: Employees
  },
  {
    path: "/parkeo/admin-page/branches",
    name: "Branches",
    component: Branches
  },
  {
    path: "/parkeo/admin-page/serviceshifts",
    name: "ServiceShifts",
    component: ServiceShifts
  },
  {
    path: "/parkeo/admin-page/parkings",
    name: "Parkings",
    component: Parkings
  },
  {
    path: "/parkeo/admin-page/employeexserviceshifts",
    name: "EmployeexServiceShifts",
    component: EmployeexServiceShifts
  },
  {
    path: "/parkeo/admin-page/test",
    name: "Test",
    component: Test
  }
];

export default indexRoutes;
