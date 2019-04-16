/** When your routing table is too long, you can split it into small modules**/

const generalRouter = {
  path: "/",
  component: require("@/views/customer/layouts").default,
  meta: {
    requiredAuth: true
  },
  children: [
    {
      path: "/post",
      name: "post",
      component: require("@/views/customer/post").default
    },
    {
      path: "/campaign",
      name: "campaign",
      component: require("@/views/customer/campaign").default
    }
  ]
};

export default generalRouter;
