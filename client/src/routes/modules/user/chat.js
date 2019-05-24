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
        name: "broadcasts",
        component: require("@/views/user/chat/broadcasts").default
      },
      {
        path: "account",
        name: "account",
        component: require("@/views/user/chat/account").default
      }
    ]
  };

export default generalChatRouter;