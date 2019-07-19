/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
/** When your routing table is too long, you can split it into small modules**/

const generalChatRouter = {
    path: "/chat",
    component: require( "@/views/user/chat/layouts" ).default,
    meta: {
      requiredAuth: true
    },
    children: [
      {
        path: "account",
        name: "chat_account",
        component: require("@/views/user/chat/account").default
      },
      {
        path: "scripts",
        name: "scripts",
        component: require("@/views/user/chat/scripts").default
      },
      {
        path: "keywords",
        name: "keywords",
        component: require("@/views/user/chat/keywords").default
      },
      {
        path: "friends",
        name: "friends",
        component: require("@/views/user/chat/friends").default
      },
      {
        path: "broadcasts",
        component: require("@/views/user/chat/broadcasts").default,
        children: [
          {
            path: "",
            name: "broadcasts",
            component: require("@/views/user/chat/broadcasts/desktop/components/main/default").default,
          },
          {
            path: "/schedule/:scheduleBlockId",
            name: "chat_broadcast_schedule",
            component: require("@/views/user/chat/broadcasts/desktop/components/main/schedule")
              .default
          }
        ]
      },
      {
        path: "facebook",
        component: require( "@/views/user/chat/facebook" ).default,
        children: [
          {
            path: "",
            name: "chat_fbaccount",
            component: require( "@/views/user/chat/facebook/desktop/list" ).default
          },
          {
            path: ":fbAccountId",
            name: "chat_fbaccount_detail",
            component: require( "@/views/user/chat/facebook/desktop/detail" ).default
          }
        ]
      },
    ]
  };

export default generalChatRouter;
