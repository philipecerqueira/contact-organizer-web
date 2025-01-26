<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-card outlined>
          <v-card-title>
            <span class="text-h6 mr-2">Domínios </span>
            <span class="text-subtitle-2">({{ totalDomain }})</span>
          </v-card-title>
          <v-simple-table fixed-header>
            <thead>
              <tr>
                <th class="text-left">Nome</th>
                <th class="text-left">E-mails</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in domainList" :key="item.domain">
                <td>{{ item.domain }}</td>
                <td>
                  <li
                    v-for="(email, emailIndex) in item.emails"
                    :key="emailIndex"
                    style="list-style-type: none"
                  >
                    {{ email }}
                  </li>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getContactsByDomain } from "@/services";

export default {
  data: () => ({
    domainList: [],
    totalDomain: 0,
  }),
  methods: {
    async fetchContacts() {
      try {
        const { data } = await getContactsByDomain();
        this.domainList = data;
        this.totalDomain = data.length;
      } catch (error) {
        console.log("Erro ao buscar domínios:", error);
      }
    },
  },
  mounted() {
    this.fetchContacts();
  },
};
</script>
