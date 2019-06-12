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
      name: "post_dashboard",
      component: require("@/views/user/post/home").default
    },
    {
      path: "posts",
      component: require( "@/views/user/post/posts" ).default,
      children: [
        {
          path: "",
          name: "post_posts",
          component: require( "@/views/user/post/posts/desktop/posts/list" )
            .default
        },
        {
          path: ":id/update",
          name: "post_update_post",
          component: require( "@/views/user/post/posts/desktop/posts/create" )
            .default
        },
        {
          path: "categories",
          name: "post_postCategories",
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
        name: "post_campaigns",
        component: require( "@/views/user/post/campaigns/desktop/list" )
          .default
      },
        {
          path: "history",
          name: "post_campaign_history",
          component: require( "@/views/user/post/campaigns/desktop/history" ).default
        },
      {
        path: ":campaignId",
        name: "post_campaigns_detail",
        component: require( "@/views/user/post/campaigns/desktop/detail" )
          .default
      }
      ]
    },
    {
      path: "account",
      name: "post_account",
      component: require( "@/views/user/post/account" ).default
    },
    {
      path: "group",
      name: "post_group",
      component: require( "@/views/user/post/postgroup" ).default
    },
    {
      path: "f-account",
      component: require( "@/views/user/post/facebook" ).default,
      children: [
        {
          path: "",
          name: "post_fbaccount",
          component: require( "@/views/user/post/facebook/desktop/list" ).default
        },
        {
          path: ":fbAccountId",
          name: "post_fbaccount_detail",
          component: require( "@/views/user/post/facebook/desktop/detail" ).default
        }
      ]
    },
    {
      path: "auto",
      name: "post_auto",
      component: require( "@/views/user/post/auto" ).default
    }
  ]
};

export default generalPostRouter;
