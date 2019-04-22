/* eslint-disable prettier/prettier */
/** When your routing table is too long, you can split it into small modules**/
const loginRouter = {
  path: "/login",
  component: () => import( "@/views/customer/login" )
};

export default loginRouter;
