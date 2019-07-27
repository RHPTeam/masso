/** When your routing table is too long, you can split it into small modules**/
const messengerRouter = {
  path: "/messenger",
  name: "messenger",
  component: () => import( "@/views/user/chat/messenger" )
};

export default messengerRouter;
