/* eslint-disable prettier/prettier */
/** When your routing table is too long, you can split it into small modules**/
const password = {
  path: "/reset-password",
  component: () => import( "@/views/user/_general/password/index" ),
  children: [
    {
      path: "",
      name: "step1",
      component: () => import( "@/views/user/_general/password/components/step1" )
    },
    {
      path: "step-2",
      name: "step2",
      component: () => import( "@/views/user/_general/password/components/step2" )
    },
    {
      path: "step-3",
      name: "step3",
      component: () => import( "@/views/user/_general/password/components/step3" )
    }
  ]
};

export default password;
