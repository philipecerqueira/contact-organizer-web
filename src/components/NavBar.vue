<template>
  <v-app-bar app class="px-8" elevation="0">
    <v-toolbar-title
      ><v-icon class="mr-2">mdi-contacts</v-icon>Organizador de
      Contatos</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-btn text to="/contacts" router> Contatos </v-btn>
    <v-btn text to="/domains" class="mx-3" router> Domínios </v-btn>
    <v-btn text to="/" @click="toggleLogin">
      <v-icon class="mr-1">
        {{ isLoggedIn ? "mdi-logout" : "mdi-login" }}
      </v-icon>
      {{ isLoggedIn ? "Logout" : "Login" }}
    </v-btn>
  </v-app-bar>
</template>

<script>
import { logout } from "@/services";

export default {
  data: () => ({
    isLoggedIn: !!localStorage.getItem("isAuthenticated"),
  }),
  methods: {
    toggleLogin() {
      if (this.isLoggedIn) {
        logout();
        localStorage.removeItem("isAuthenticated");
        this.isLoggedIn = false;
        return;
      }

      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
  },
};
</script>
