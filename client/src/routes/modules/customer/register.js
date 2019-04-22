/* eslint-disable prettier/prettier */
/** When your routing table is too long, you can split it into small modules**/
const registerRouter = {
  path: "/register",
  component: () => import( "@/views/customer/register" )
};

export default registerRouter;
