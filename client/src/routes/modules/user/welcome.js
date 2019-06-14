/* eslint-disable prettier/prettier */
/** When your routing table is too long, you can split it into small modules**/
const welcomeRouter = {
  path: "/welcome",
  meta: {
    requiredAuth: true
  },
  name: "welcome",
  // component: () => import( "@/views/user/_general/welcome" )
  redirect: { name: "post_dashboard" }
};

export default welcomeRouter;
