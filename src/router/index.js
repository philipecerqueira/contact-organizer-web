import Vue from "vue";
import VueRouter from "vue-router";

import ContactList from "../components/ContactList.vue";
import LoginPage from "../components/LoginPage.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: LoginPage, name: "LoginPage" },
  { path: "/contacts", component: ContactList, name: "ContactList" },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
