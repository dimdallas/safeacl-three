<template>
  <v-card class="ma-4 mx-auto" shaped elevation="5">
    <v-list color="rgba(0,0,0,.2)"  class="mt-n0">
      <v-list-item>
        <v-list-item-avatar class="mt-n0" size="50" >
          <v-img src="img6.png" />
        </v-list-item-avatar>
        <v-list-item-title>{{ patient.name +' ' + patient.surname }}</v-list-item-title>
        <v-list-item-title>{{ patient.id_num }}</v-list-item-title>
        <!-- <v-list-item-subtitle class=".body-2">{{ patient.email }}</v-list-item-subtitle> -->
        <v-list-item-subtitle>{{ patient.description }}</v-list-item-subtitle>
        <v-btn to="/patient" text rounded>See Profile</v-btn>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "PatientEntry",
  props: {
    patient: Object,
  },
};
</script>

<style>
.patient {
  display: flex;
  justify-content: space-between;
}
</style>