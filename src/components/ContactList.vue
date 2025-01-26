<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-card outlined>
          <v-card-title>
            <span class="text-h6 mr-2">Contatos </span>
            <span class="text-subtitle-2"> ({{ totalPeople }})</span>
          </v-card-title>
          <v-simple-table fixed-header>
            <thead>
              <tr>
                <th class="text-left">Nome</th>
                <th class="text-left">E-mail</th>
                <th class="caption text-left">Telefone</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in contacts" :key="item.resourceName">
                <td>{{ item.names?.[0]?.displayName || "Não informado" }}</td>
                <td>
                  {{ item.emailAddresses?.[0]?.value || "Não informado" }}
                </td>
                <td>{{ item.phoneNumbers?.[0]?.value || "Não informado" }}</td>
              </tr>
            </tbody>
          </v-simple-table>

          <v-card-actions v-if="nextPageToken" class="justify-center">
            <v-btn
              @click="fetchContacts(nextPageToken)"
              color="primary"
              outlined
            >
              Carregar Mais
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getAllContacts } from "@/services";

export default {
  data: () => ({
    contacts: [],
    nextPageToken: null,
    totalPeople: 0,
  }),
  methods: {
    async fetchContacts(pageToken = null) {
      try {
        const { data } = await getAllContacts(pageToken);
        const { connections, nextPageToken, totalPeople } = data;
        this.contacts = [...this.contacts, ...connections];
        this.nextPageToken = nextPageToken;
        this.totalPeople = totalPeople;
      } catch (error) {
        console.log("Erro ao buscar contatos:", error);
      }
    },
  },
  mounted() {
    this.fetchContacts();
  },
};
</script>
