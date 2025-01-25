<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-alert
        v-if="alert.visible"
        :type="alert.type"
        dismissible
        colored-border
        border="top"
        transition="scale-transition"
        elevation="4"
        style="
          position: fixed;
          right: 20px;
          top: 100px;
          z-index: 9999;
          max-width: 600px;
        "
      >
        {{ alert.message }}
      </v-alert>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/NavBar.vue";
import { EventBus } from "./utils/bus";

export default {
  components: { Navbar },
  data() {
    return {
      alert: {
        visible: false,
        message: "",
        type: "",
      },
    };
  },
  created() {
    EventBus.$on("showAlert", (alertData) => {
      this.alert.message = alertData.message;
      this.alert.type = alertData.type;
      this.alert.visible = true;

      setTimeout(() => {
        this.alert.visible = false;
      }, 5000);
    });
    EventBus.$on("redirectToHome", () => {
      this.$router.push("/");
    });
  },
};
</script>
