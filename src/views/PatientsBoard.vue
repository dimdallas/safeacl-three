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
        /* {
            patient_id: 2,
            name: "Dimitris",
            surname: "Dallas",
            id_num: "1111",
            age: 23,
            height: "180",
            bloodtype: "B+",
            email: "ddallas@gmail.com",
            description: "femur pain",
            createdAt: "2021-03-31",
            updatedAt: "2021-03-31",
            user_id: "b310ebe3-384e-4cc8-a0b4-8a17f86d25be"
        },
        {
            patient_id: 3,
            name: "Nikos",
            surname: "Aggelopoulos",
            id_num: "2222",
            age: 24,
            height: "190",
            bloodtype: "A+",
            email: "nangelo@gmail.com",
            description: "femur pain",
            createdAt: "2021-04-01",
            updatedAt: "2021-04-01",
            user_id: "b310ebe3-384e-4cc8-a0b4-8a17f86d25be"
        },
        {
            patient_id: 4,
            name: "Giorgos",
            surname: "Kletsas",
            id_num: "3333",
            age: 23,
            height: "185",
            bloodtype: "AB+",
            email: "gkle@gmail.com",
            description: "femur pain",
            createdAt: "2021-04-01",
            updatedAt: "2021-04-01",
            user_id: "b310ebe3-384e-4cc8-a0b4-8a17f86d25be"
        } */
      ]
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
        this.patientList = content.message
        // console.log(this.patientList)
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