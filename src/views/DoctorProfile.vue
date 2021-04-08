<template>
  <v-main>
    <v-row>
      <v-col>
        <v-card class="mx-auto" max-width="900" shaped>
          <v-img
            class="mx-auto"
            height="100%"
            width="100%"
            src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
          >
            <v-row align="end" class="fill-height">
              <v-col align-self="start" class="pa-0" cols="12">
                <v-avatar
                  size="180"
                  style="position: absolute; bottom: 20px; left: 20px"
                >
                  <v-img src="img6.png"></v-img>
                </v-avatar>
              </v-col>
            </v-row>
          </v-img>
          <v-list color="rgba(0, 0, 0, .1)">
            <v-row>
              <v-col>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="title">{{
                      info.name + " " + info.surname
                    }}</v-list-item-title>
                    <v-list-item-subtitle
                      >Orthopedic Doctor</v-list-item-subtitle
                    >
                    <v-divider></v-divider>
                    <v-list-item-content>
                      {{ info.email }}
                    </v-list-item-content>
                    <v-list-item-content>
                      {{ info.phone }}
                    </v-list-item-content>
                    <v-list-item-content>
                      {{ info.address }}
                    </v-list-item-content>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-spacer></v-spacer>
              <v-col>
                <v-list-item>
                  <v-list-item-content
                    >This is the description of the doctor</v-list-item-content
                  >
                </v-list-item>
              </v-col>
            </v-row>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
export default {
  name: "DoctorProfile",
  data() {
    return {
      info: {},
      /* user:
            address: "Nitlan"
            createdAt: "2021-03-27"
            email: "test1@email.gr"
            name: "member"
            password: 
            phone: "6931231323"
            role: "Member"
            surname: "member"
            updatedAt: "2021-03-27"
            user_id: "b310ebe3-384e-4cc8-a0b4-8a17f86d25be"
            username: "member 
        */
    };
  },
  methods: {
    getProfile(){
      const inMemoryToken = localStorage.getItem("token");
      if(inMemoryToken == null){
        this.$router.push('/authentication')
        return
      }

      // console.log(inMemoryToken)
      this.$store
        .dispatch("getProfile", inMemoryToken)
        .then(response => {
          // console.log(response);

          this.info = response.data.user
        })
        .catch((error) => {
          console.log("profile error");
          console.log(error);
        });
    }
  },
  mounted() {
    this.getProfile();
  },
};
</script>

<style>
.corrected {
  position: relative;
  right: 120px;
}
</style>