<template>
<!-- width 120, heigth 300 -->
  <v-navigation-drawer
    dark
    app
    clipped
    v-model="drawer"
    permanent
    mini-variant
    mini-variant-width="140"
    height="350"
    class="teal darken-4"
  >
    <!-- <v-list>
      <v-list-item class="mb-12">
        <v-list-item-action>
        </v-list-item-action>
      </v-list-item>
    </v-list> -->
    <v-list class="mt-10" flat>
      <v-list-item router to="/overview">
        <v-list-item-content>
          <v-icon class="mb-2">dashboard</v-icon>
          <v-list-item-subtitle align="center">Overview</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <!-- <v-list-item router to="/profile">
        <v-list-item-content>
          <v-icon class="mb-2">fas fa-user-md</v-icon>
          <v-list-item-subtitle align="center">Doctor</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item> -->
      <!-- <v-list-item router to="/home">
        <v-list-item-content>
          <v-icon class="mb-2">fas fa-file-medical</v-icon>
          <v-list-item-subtitle align="center">My Files</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item> -->
      <v-list-item router to="/patients">
        <v-list-item-content>
          <v-icon class="mb-2">fas fa-id-card-alt</v-icon>
          <v-list-item-subtitle align="center">Patients Board</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item router to="/patientstable">
        <v-list-item-content>
          <v-icon class="mb-2">fas fa-id-card</v-icon>
          <v-list-item-subtitle align="center">Patients Table</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item router to="/overview">
        <v-list-item-content>
          <v-icon class="mb-2">fas fa-notes-medical</v-icon>
          <v-list-item-subtitle align="center"
            >Simulations</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- <v-list style="position: absolute; bottom: 0" class="ml-6" flat>
      <v-list-item @click="drawer=false">
        <v-list-item-action>
          <v-icon right>fas fa-bars</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list> -->
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