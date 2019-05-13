/** When your routing table is too long, you can split it into small modules**/

const generalRouter = {
  path: "/help",
  component: require( "@/views/guide/layouts" ).default,
  children: [
    {
      path: "",
      name: "guide_home",
      component: require( "@/views/guide/home" ).default
    }
  ]
};

export default generalRouter;
