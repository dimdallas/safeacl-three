<template>
  <v-navigation-drawer
    dark
    app
    clipped
    v-model="drawer"
    mini-variant
    mini-variant-width="100"
    class="teal darken-4"
  >
    <v-list>
      <v-list-item class="mb-12">
        <v-list-item-action></v-list-item-action>
      </v-list-item>
    </v-list>
    <v-list flat>
      <v-list-item router to="/dashboard">
        <v-list-item-content>
          <v-icon class="mb-2">dashboard</v-icon>
          <v-list-item-subtitle align="center">Dashboard</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item router to="/home">
        <v-list-item-content>
          <v-icon class="mb-2">fas fa-user-md</v-icon>
          <v-list-item-subtitle align="center">Doctor</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item router to="/home">
        <v-list-item-content>
          <v-icon class="mb-2">fas fa-file-medical</v-icon>
          <v-list-item-subtitle align="center">My Files</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item router to="/home">
        <v-list-item-content>
          <v-icon class="mb-2">fas fa-notes-medical</v-icon>
          <v-list-item-subtitle align="center">My Notes</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-list style="position: absolute; bottom: 0" class="ml-3" flat>
      <v-list-item router to="/login">
        <v-list-item-action>
          <v-icon right>fas fa-sign-out-alt</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SideNav",
  data() {
    return {
      drawer: true,
    };
  },
};
</script>