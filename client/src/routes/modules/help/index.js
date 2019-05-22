/** When your routing table is too long, you can split it into small modules**/

const generalRouter = {
  path: "/help",
  component: require( "@/views/help/layouts" ).default,
  children: [
    {
      path: "",
      name: "guide_home",
      component: require( "@/views/help/home" ).default
    },
    {
      path: "detail/:id",
      name: "guide_detail",
      component: require("@/views/help/detail").default
    }

  ]
};

export default generalRouter;
