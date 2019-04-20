/* eslint-disable global-require */
/* eslint-disable prettier/prettier */
/** When your routing table is too long, you can split it into small modules**/

const generalRouter = {
  path: "/",
  component: require( "@/views/customer/layouts" ).default,
  meta: {
    requiredAuth: true
  },
  children: [
    {
      path: "/posts",
      component: require( "@/views/customer/posts" ).default,
      children: [
        {
          path: "",
          name: "posts",
          component: require( "@/views/customer/posts/desktop/posts" ).default
        },
        {
          path: "categories",
          name: "categories",
          component: require( "@/views/customer/posts/desktop/categories" )
            .default
        }
      ]
    },
    {
      path: "/campaign",
      name: "campaign",
      component: require( "@/views/customer/campaign" ).default
    }
  ]
};

export default generalRouter;
