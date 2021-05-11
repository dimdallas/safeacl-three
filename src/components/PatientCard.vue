<template>
  <v-card
    dark
    shaped
    elevation="5"
    width="200"
    class="d-flex flex-column mx-auto"
  >
    <v-list color="teal darken-3" class="mt-n0">
      <v-list-item>
        <v-list-item-avatar class="mt-n0 mx-auto" size="100">
          <!-- <v-img :src="require('/public/' + patient.image.split('/')[1])" /> -->
          <v-img :src="this.image" />
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item three-line>
        <v-list-item-content class="mx-auto">
          <v-list-item-title class="text-center">{{
            patient.name
          }}</v-list-item-title>
          <v-list-item-title class="text-center">{{
            patient.surname
          }}</v-list-item-title>
          <v-list-item-subtitle class="text-center">{{
            patient.id_num
          }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-action class="mx-auto">
          <v-btn @click="childFunc" text rounded>Profile</v-btn>
        </v-list-item-action>
      </v-list-item>
      <!-- <v-list-item>
        <v-list-item-action class="mx-auto">
          <v-btn to="/patient" text rounded>See Profile</v-btn>
        </v-list-item-action>
      </v-list-item> -->
    </v-list>
  </v-card>
</template>

<script>
import def_image from "/public/img6.png";
export default {
  name: "PatientCard",
  props: {
    patient: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      image: def_image,
      patientForParent: Object,
    };
  },
  beforeMount() {
    if(this.patient.image != null){
      this.image = "http://10.64.92.213:8883/" + this.patient.image
    }
    this.patientForParent = this.patient.patient_id
  },
  methods: {
    childFunc(){
      this.$emit('parentFunc', this.patientForParent)
    }
  }
};
</script>

<style>
.patient {
  display: flex;
  justify-content: space-between;
}
</style>