/** When your routing table is too long, you can split it into small modules**/
const wellcomeRouter = {
  path: "/wellcome",
  component: () => import("@/views/customer/wellcome")
};

export default wellcomeRouter;
