<template>
  <v-main class="fill-height">
    <side-nav />
    <v-container fluid ma-0 pa-0 fill-height>
      <v-row justify="center" align="center">
        <v-col align-self="start">
          <v-card
            class="ma-10 text-center mx-auto"
            width="400"
            shaped
            elevation="10"
          >
            <v-avatar class="mt-n7" size="60" elevation="10">
              <img src="img2m.png" />
            </v-avatar>
            <v-card-title class="layout justify-center"
              >{{patient.name}} {{patient.surname}}</v-card-title
            >
            <v-card-subtitle class="layout justify-center"
              >{{patient.age}} χρονών, Βόλος</v-card-subtitle
            >
            <v-list class="mt-n5 ma-0">
              <v-list-item>
                <v-list-item-title class="cyan--text text--darken-1"
                  >Τύπος Αίματος</v-list-item-title
                >
                <v-list-item-title class="cyan--text text--darken-1"
                  >Ύψος</v-list-item-title
                >
                <v-list-item-title class="cyan--text text--darken-1"
                  >Βάρος</v-list-item-title
                >
              </v-list-item>
              <v-list-item>
                <v-list-item-subtitle>{{patient.bloodtype}}</v-list-item-subtitle>
                <v-list-item-subtitle>{{patient.height}} cm</v-list-item-subtitle>
                <v-list-item-subtitle>{{patient.weight}} Kg</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
          <!-- <v-divider vertical></v-divider> -->

          <v-card class="ma-10 mx-auto" width="400" shaped elevation="10">
            <v-list class="mt-n5">
              <v-list-item>
                <v-list-item-avatar
                  size="10"
                  color="cyan darken-1"
                ></v-list-item-avatar>
                <v-list-item-title class="ml-n2">Kognum</v-list-item-title>
                <v-list-item-subtitle>10 mg</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="cyan--text text--darken-1"
                  >ΔΕΥ</v-list-item-title
                >
                <v-list-item-title class="cyan--text text--darken-1"
                  >ΤΕΤ</v-list-item-title
                >
                <v-list-item-title class="cyan--text text--darken-1"
                  >ΠΑΡ</v-list-item-title
                >
                <v-list-item-title class="cyan--text text--darken-1"
                  >ΚΥΡ</v-list-item-title
                >
              </v-list-item>
              <v-list-item class="mt-n5">
                <v-list-item-subtitle
                  >2 φορές την ημέρα πριν το φαγητό</v-list-item-subtitle
                >
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <!-- <v-list two-line="" subheader="">
                  <v-list-item>
                    <v-list-item-avatar size="35">
                      <img src="favicon.ico">
                    </v-list-item-avatar>
                    <v-list-item-content class="ml-n2">
                      <v-list-item-title>Dr Isabella Bowers</v-list-item-title>
                      <v-list-item-subtitle>California Hospital Medical</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list> -->
            <v-list two-line="" subheader="" class="mt-n5">
              <v-list-item>
                <v-list-item-title>Χειρουργείο</v-list-item-title>
                <v-list-item-subtitle>{{patient.description}}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
            <v-list two-line="" subheader="" class="my-n8">
              <v-list-item>
                <v-list-item-title class="cyan--text text--darken-1"
                  >Ημερομηνία</v-list-item-title
                >
                <v-list-item-title class="cyan--text text--darken-1"
                  >Ώρα</v-list-item-title
                >
              </v-list-item>
              <v-list-item class="mt-n10">
                <v-list-item-title>24 Μαρτίου 2021</v-list-item-title>
                <v-list-item-title>14:45</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col align-self="start">
            <three-view />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import SideNav from "../components/SideNav.vue";
import ThreeView from "./ThreeView.vue";

export default {
  components: { SideNav, ThreeView },
  name: "PatientProfile",
  props: {
    patient: Object,
  },
};
</script>

<style scoped>
.rounded {
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}
</style>