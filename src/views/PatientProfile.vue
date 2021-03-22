<template>
  <v-main class="pt-0">
    <side-nav/>
    <v-container fluid ma-0 pa-0 fill-height>
    <v-layout row fill-height>
      <v-flex md3 >
        <v-main >
            <v-flex>
              <v-card class="ma-10 text-center mx-auto" shaped elevation="10">
                <v-avatar class="mt-n7" size="60" elevation="10">
                  <img src="favicon.ico" />
                </v-avatar>
                <v-card-title class="layout justify-center"
                  >Bes Willis</v-card-title
                >
                <v-card-subtitle class="layout justify-center"
                  >24 years old, California</v-card-subtitle
                >
                <v-list class="mt-n5">
                  <v-list-item>
                    <v-list-item-title class="cyan--text text--darken-1"
                      >Blood</v-list-item-title
                    >
                    <v-list-item-title class="cyan--text text--darken-1"
                      >Height</v-list-item-title
                    >
                    <v-list-item-title class="cyan--text text--darken-1"
                      >Weight</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-subtitle>B+</v-list-item-subtitle>
                    <v-list-item-subtitle>170 cm</v-list-item-subtitle>
                    <v-list-item-subtitle>60 Kg</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-flex>
            <!-- <v-divider vertical></v-divider> -->
            <v-flex>
              <v-card class="ma-10 mx-auto" shaped elevation="10">
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
                      >MON</v-list-item-title
                    >
                    <v-list-item-title class="cyan--text text--darken-1"
                      >WED</v-list-item-title
                    >
                    <v-list-item-title class="cyan--text text--darken-1"
                      >FRI</v-list-item-title
                    >
                    <v-list-item-title class="cyan--text text--darken-1"
                      >SUN</v-list-item-title
                    >
                  </v-list-item>
                  <v-list-item class="mt-n5">
                    <v-list-item-subtitle>2 times in a day before food</v-list-item-subtitle>
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
                    <v-list-item-title>Surgery</v-list-item-title>
                    <v-list-item-subtitle>femur pain</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
                <v-list two-line="" subheader="" class="my-n8">
                  <v-list-item>
                    <v-list-item-title class="cyan--text text--darken-1">Date</v-list-item-title>
                    <v-list-item-title class="cyan--text text--darken-1">Time</v-list-item-title>
                  </v-list-item>
                  <v-list-item class="mt-n10">
                    <v-list-item-title>24 Mar 2021</v-list-item-title>
                    <v-list-item-title>14:45</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-flex>
        </v-main>
      </v-flex>
      <v-flex md9 >
        <v-main class="pt-0">
          <three-view />
        </v-main>
      </v-flex>
    </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import SideNav from "../components/SideNav.vue";
import ThreeView from './ThreeView.vue';


export default {
  components: { SideNav, ThreeView },
  name: "PatientProfile",
  //   computed: {
  //     theme() {
  //       return this.$vuetify.theme.dark ? "dark" : "light";
  //     },
  //   },
};
</script>

<style scoped>
.rounded {
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}
</style>