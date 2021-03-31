<template>
  <v-main>
    <side-nav />
    <v-container fluid ma-0 pa-0 fill-height>
      <v-layout row>
        <v-flex md8>
          <v-main>
            <v-flex>
              <patient-entry
                v-for="patientEntry in patientList"
                :patient="patientEntry"
                :key="patientEntry.id"
              />
            </v-flex>
          </v-main>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
import SideNav from "../components/SideNav.vue";
import PatientEntry from "./PatientEntry.vue";

export default {
  components: {
    SideNav,
    PatientEntry,
  },
  name: "Dashboard",
  data() {
    return {
      patientList: [
        {
          id: 1,
          name: "Γεώργιος Παππάς",
          email: "gpappas@gmail.com",
          img: "img6.png",
          description: "Πόνος στον μοιρό",
        },
        {
          id: 2,
          name: "Ιωάννης Παπαδόπουλος",
          email: "ioanpapad@gmail.com",
          img: "img4.png",
          description: "Πόνος στον μοιρό",
        },
        {
          id: 3,
          name: "Κωνσταντίνος Ιωαννίδης",
          email: "konioan@gmail.com",
          img: "img5.png",
          description: "Πόνος στον μοιρό",
        },
      ],
    };
  },
  methods:{
    async init() {
      try {
        const localstorageUser = JSON.parse(localStorage.getItem('user'))
        const inMemoryToken = localstorageUser.token
        const response = await fetch('http://10.64.92.213:8883/patients', {
          headers: {'Content-Type': 'application/json', 'Authorization': inMemoryToken},
        });

        if(response.status != 200){
          throw Error;
        }
        const content = await response.json();
        console.log(content)
        /* patient:
        */

      }catch (e){
        console.log(e)
      }
    }
  },
  mounted(){
    this.init();
  }
};
</script>

<style>
</style>