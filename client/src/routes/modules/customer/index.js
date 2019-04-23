/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
/** When your routing table is too long, you can split it into small modules**/

const generalRouter = {
  path: "/",
  component: require( "@/views/customer/layouts" ).default,
  meta: {
    requiredAuth: true
  },
  children: [ {
    path: "/posts",
    component: require( "@/views/customer/posts" ).default,
    children: [ {
      path: "",
      name: "posts",
      component: require( "@/views/customer/posts/desktop/posts/list" )
        .default
    },
    {
      path: "create",
      name: "post/create",
      component: require( "@/views/customer/posts/desktop/posts/create" )
        .default
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
    path: "/campaigns",
    name: "campaigns",
    component: require( "@/views/customer/campaigns" ).default
  },
  {
    path: "/friends",
    name: "f_friends",
    component: require( "@/views/customer/friends" ).default
  },
  {
    path: "/account",
    name: "account",
    component: require( "@/views/customer/account" ).default
  }
  ]
};

export default generalRouter;
