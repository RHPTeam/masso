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
      path: "/posts/:id",
      name: "update_post",
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
    path: "/friends",
    name: "f_friends",
    component: require( "@/views/customer/friends" ).default
  },
  {
    path: "/campaigns",
    component: require( "@/views/customer/campaigns" ).default,
    children: [ {
      path: "",
      name: "campaigns",
      component: require( "@/views/customer/campaigns/desktop/list" )
        .default
    },
    {
      path: ":campaignId",
      name: "campaigns/detail",
      component: require( "@/views/customer/campaigns/desktop/detail" )
        .default
    }
    ]
  },
  {
    path: "/account",
    name: "account",
    component: require( "@/views/customer/account" ).default
  }
  ]
};

export default generalRouter;
