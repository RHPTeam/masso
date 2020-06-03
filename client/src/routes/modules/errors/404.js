/* eslint-disable prettier/prettier */
/** When your routing table is too long, you can split it into small modules**/
const error404Router = {
  path: "/404",
  component: () => import( "@/views/user/_general/errors/404" )
};

export default error404Router;
