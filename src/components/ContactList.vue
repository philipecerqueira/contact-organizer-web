<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <v-card class="elevation-2">
          <v-card-title>
            <span class="text-h6">Contatos</span>
          </v-card-title>

          <v-simple-table fixed-header>
            <thead>
              <tr>
                <th class="text-left">Nome</th>
                <th class="text-left">Email</th>
                <th class="text-left">Telefone</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in contacts" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.phone }}</td>
                <td class="text-center">
                  <v-btn icon @click="editContact(item)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="deleteContact(item)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
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
import { getAllContacts } from "@/services";

export default {
  data: () => ({
    contacts: [],
  }),
  methods: {
    async fetchContacts() {
      try {
        const response = await getAllContacts();
        console.log(response);
        this.contacts = response.data;
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
