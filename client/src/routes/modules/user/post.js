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
          path: "list",
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
        },
        {
          path: "categories-default",
          name: "categories_default",
          component: require( "@/views/user/post/posts/desktop/categoriesdefault" )
            .default
        },
        {
          path: ":id/categories",
          name: "post_categories",
          component: require( "@/views/user/post/posts/desktop/categories/components/post" )
            .default
        }
      ]
    },
    {
      path: "campaigns",
      component: require( "@/views/user/post/campaigns" ).default,
      children: [
        {
          path: "list",
          name: "post_campaigns",
          component: require( "@/views/user/post/campaigns/desktop/list" )
            .default
        },
        {
          path: "detail/:campaignId",
          name: "post_campaigns_detail",
          component: require( "@/views/user/post/campaigns/desktop/detail" )
            .default
        },
        {
          path: "campaigns-default",
          name: "campaigns_default",
          component: require( "@/views/user/post/campaigns/desktop/simple" )
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
      path: "support",
      name: "post_support",
      component: require( "@/views/user/post/support" ).default
    },
    {
      path: "fb-search",
      name: "post_fb_search",
      component: require( "@/views/user/post/search" ).default
    },
    {
      path: "agency",
      name: "post_agency",
      component: require( "@/views/user/agency" ).default
    }
  ]
};

export default generalPostRouter;
