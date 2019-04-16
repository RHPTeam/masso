import Vue from "vue";

// Icon Component
Vue.component("IconAccount", () => import("@/components/icons/IconAccount"));
Vue.component("IconArrowDown", () =>
  import("@/components/icons/IconArrowDown")
);
Vue.component("IconAutoAnswer", () =>
  import("@/components/icons/IconAutoAnswer")
);
Vue.component("IconBase", () => import("@/components/icons/IconBase"));
Vue.component("IconBroadcast", () =>
  import("@/components/icons/IconBroadcast")
);
Vue.component("IconCalendar", () => import("@/components/icons/IconCalendar"));
Vue.component("IconChat", () => import("@/components/icons/IconChat"));
Vue.component("IconEdit", () => import("@/components/icons/IconEdit"));
Vue.component("IconFriend", () => import("@/components/icons/IconFriend"));
Vue.component("IconHome", () => import("@/components/icons/IconHome"));
Vue.component("IconInputSearch", () =>
  import("@/components/icons/IconInputSearch")
);
Vue.component("IconLibs", () => import("@/components/icons/IconLibs"));
Vue.component("IconLogout", () => import("@/components/icons/IconLogout"));
Vue.component("IconMenu", () => import("@/components/icons/IconMenu"));
Vue.component("IconRemove", () => import("@/components/icons/IconRemove"));
Vue.component("IconScript", () => import("@/components/icons/IconScript"));

// Icon Logo
Vue.component("IconLogoShort", () =>
  import("@/components/icons/IconLogoShort")
);
Vue.component("IconLogoText", () => import("@/components/icons/IconLogoText"));

// Global Component
Vue.component("Breadcrumb", () =>
  import("@/components/shared/layouts/breadcrumb")
);

Vue.component("Fullcalendar", () => import("@/components/rfullcalendar"));

Vue.component("ToggleSwitch", () => import("@/components/switch"));

Vue.component("Paginate", () => import("@/components/shared/paginate"));
