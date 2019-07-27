/* eslint-disable prettier/prettier */
/** When your routing table is too long, you can split it into small modules**/
const redirectRouter = {
  path: "/redirect",
  name: "redirect",
  component: () => import( "@/views/user/_general/redirect" )
};

export default redirectRouter;
