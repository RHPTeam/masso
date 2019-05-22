/* eslint-disable prettier/prettier */
/** When your routing table is too long, you can split it into small modules**/
const signupRouter = {
  path: "/signup",
  component: () => import( "@/views/user/_general/signup" )
};

export default signupRouter;
