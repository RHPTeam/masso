/** When your routing table is too long, you can split it into small modules**/

const marketRouter = {
  path: "/market",
  component: require( "@/views/user/market/layouts" ).default,
  children: [
    {
      path: "",
      name: "market_home",
      component: require( "@/views/user/market/home" ).default
    }
  ]
};

export default marketRouter;
