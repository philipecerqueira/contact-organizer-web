<template>
  <v-container fluid fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="3">
        <v-card class="elevation-6">
          <v-card-title class="justify-center text-h6"
            >Conecte-se conosco</v-card-title
          >
          <v-card-text class="d-flex flex-column align-center">
            <v-btn
              block
              color="primary"
              @click="loginWithGoogle"
              class="mb-4 elevation-6"
              rounded
            >
              <v-icon class="ma-2">mdi-google</v-icon> Login com Google
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    loginWithGoogle() {
      const popup = window.open(
        `${process.env.VUE_APP_API_BASE_URL}/auth/login`,
        "google-oauth",
        "width=600,height=800"
      );

      window.addEventListener(
        "message",
        (event) => {
          const data = event.data;

          if (data?.status === "success") {
            popup.close();
            localStorage.setItem("isAuthenticated", true);
            this.$router.push("/contacts");
          }
        },
        { once: true }
      );
    },
  },
};
</script>
