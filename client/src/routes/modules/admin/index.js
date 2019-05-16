/** When your routing table is too long, you can split it into small modules**/

const generalRouter = {
  path: "/admin",
  component: require( "@/views/admin/layouts" ).default,
  meta: {
    requiredAdmin: true
  },
  children: [
    {
      path: "",
      name: "admin_dashboard",
      component: require( "@/views/admin/dashboard" ).default
    },
    {
      path: "post-libraries",
      component: require( "@/views/admin/postlibraries" ).default,
      children: [
        {
          path: "",
          name: "post_libraries",
          component: require( "@/views/admin/postlibraries/list" ).default,
        },
        {
          path: ":id",
          name: "post_libraries_details",
          component: require( "@/views/admin/postlibraries/detail" ).default,
        }
      ]
    },
    {
      path: "users",
      name: "admin_users",
      component: require( "@/views/admin/accounts" ).default
    },
    {
      path: "help",
      name: "admin_help",
      component: require( "@/views/admin/help" ).default,
      children: [
        {
          path: "",
          name: "catagory",
          component: require( "@/views/admin/help/listcatagory" ).default,
        },
        {
          path: "add-post",
          name: "add_post",
          component: require( "@/views/admin/help/addpost" ).default,
        },{
          path: "add-catagory",
          name: "add_catagory",
          component: require( "@/views/admin/help/addcatagory" ).default,
        }
      ]
    }
  ]
};

export default generalRouter;
