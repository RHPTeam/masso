/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
/** When your routing table is too long, you can split it into small modules**/

const generalPostRouter = {
  path: "/post",
  component: require( "@/views/user/post/layouts" ).default,
  meta: {
    requiredAuth: true
  },
  children: [
    {
      path: "",
      name: "dashboard",
      component: require("@/views/user/post/home").default
    },
    {
      path: "posts",
      component: require( "@/views/user/post/posts" ).default,
      children: [
        {
          path: "",
          name: "posts",
          component: require( "@/views/user/post/posts/desktop/posts/list" )
            .default
        },
        {
          path: ":id/update",
          name: "update_post",
          component: require( "@/views/user/post/posts/desktop/posts/create" )
            .default
        },
        {
          path: "categories",
          name: "categories",
          component: require( "@/views/user/post/posts/desktop/categories" )
            .default
        }
      ]
    },
    {
      path: "campaigns",
      component: require( "@/views/user/post/campaigns" ).default,
      children: [ {
        path: "",
        name: "campaigns",
        component: require( "@/views/user/post/campaigns/desktop/list" )
          .default
      },
        {
          path: "history",
          name: "history",
          component: require( "@/views/user/post/campaigns/desktop/history" ).default
        },
      {
        path: ":campaignId",
        name: "campaigns/detail",
        component: require( "@/views/user/post/campaigns/desktop/detail" )
          .default
      }
      ]
    },
    {
      path: "account",
      name: "account",
      component: require( "@/views/user/post/account" ).default
    },
    {
      path: "group",
      name: "group",
      component: require( "@/views/user/post/postgroup" ).default
    },
    {
      path: "f-account",
      name: "f_account",
      component: require( "@/views/user/post/facebook" ).default
    },
    {
      path: "notifications",
      name: "notifications",
      component: require( "@/views/user/post/notifications" ).default
    }
  ]
};

export default generalPostRouter;
