/* eslint-disable prettier/prettier */
/** When your routing table is too long, you can split it into small modules**/
const welcomeRouter = {
  path: "/welcome",
  component: () => import( "@/views/user/_general/welcome" )
};

export default welcomeRouter;
