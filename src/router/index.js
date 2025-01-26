import Vue from "vue";
import VueRouter from "vue-router";

import DomainList from "@/components/DomainList.vue";
import ContactList from "../components/ContactList.vue";
import LoginPage from "../components/LoginPage.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: LoginPage, name: "LoginPage" },
  { path: "/contacts", component: ContactList, name: "ContactList" },
  { path: "/domains", component: DomainList, name: "DomainList" },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
