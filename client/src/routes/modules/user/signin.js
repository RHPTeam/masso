/* eslint-disable prettier/prettier */
/** When your routing table is too long, you can split it into small modules**/
const signinRouter = {
  path: "/signin",
  component: () => import( "@/views/user/_general/signin" )
};

export default signinRouter;
