import { ROUTE_CONSTANTS } from "./utils";

import Home from "./components/Home";

const routes = [
  {
    path: ROUTE_CONSTANTS.BASE,
    exact: true,
    component: Home,
    protected: false,
    default: false,
    view: "Base",
    allowBack: false,
  },
  {
    path: ROUTE_CONSTANTS.ANY,
    exact: false,
    component: Error,
    protected: false,
    default: false,
    view: "*",
    allowBack: false,
  },
];
export default routes;
