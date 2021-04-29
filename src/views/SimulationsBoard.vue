<template>
  <v-main class="fill-height">
    <side-nav />
    <v-card
      height="90%"
      width="100%"
      class="d-flex flex-column teal lighten-3 mx-auto corrected"
    >
      <v-container fill-height>
      <v-row justify="center" align="center">
        <v-list width="70%" max-height="70%" class="mx-auto teal lighten-3">
          <v-list-item>
            <v-btn text> Προσομοιωση 1 </v-btn>
            <v-spacer></v-spacer>
            <v-card-text class="text-center"> Νικόλαος Δημητρίου </v-card-text>
            <v-spacer></v-spacer>
            <v-card-text class="text-right"> 21/04/2021 </v-card-text>
            <v-spacer></v-spacer>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-btn text> Προσομοιωση 2 </v-btn>
            <v-spacer></v-spacer>
            <v-card-text class="text-center"> Γεώργιος Παππάς </v-card-text>
            <v-spacer></v-spacer>
            <v-card-text class="text-right"> 19/04/2021 </v-card-text>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-btn text> Προσομοιωση 3 </v-btn>
            <v-spacer></v-spacer>
            <v-card-text class="text-center"> Γεώργιος Παππάς </v-card-text>
            <v-spacer></v-spacer>
            <v-card-text class="text-right"> 12/04/2021 </v-card-text>
          </v-list-item>
        </v-list>
      </v-row>
      </v-container>
      <v-row justify="center" align="center">
        <v-btn dark class="teal darken-3">Καινουρια Προσομοiωση</v-btn>
      </v-row>
      <v-card-actions>
        <v-icon @click="prevPage">mdi-arrow-left</v-icon>
        <v-spacer></v-spacer>
        <v-card-text>{{ page }}</v-card-text>
        <v-spacer></v-spacer>
        <v-icon @click="nextPage">mdi-arrow-right</v-icon>
      </v-card-actions>
    </v-card>
  </v-main>
</template>

<script>
import SideNav from "../components/SideNav.vue";
export default {
  components: {
    SideNav,
  },
  name: "SimulationsBoard",
};
</script>

<style>
</style>