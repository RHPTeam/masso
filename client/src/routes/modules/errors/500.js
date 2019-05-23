/* eslint-disable prettier/prettier */
/** When your routing table is too long, you can split it into small modules**/
const error500Router = {
  path: "/500",
  component: () => import( "@/views/user/_general/errors/500" )
};

export default error500Router;
