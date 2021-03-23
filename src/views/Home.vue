<template>
  <v-main>
    <side-nav/>
    <v-card width="500" class="teal mx-auto corrected">
      <v-card-title class="white--text">Home</v-card-title>
      <v-card-text class="white--text">
        {{ message }}
      </v-card-text>
    </v-card>
  </v-main>
</template>

<script>
import store from "@/store/index";
import SideNav from '../components/SideNav.vue';

export default {
  components: {
    SideNav
  },
  name: "Home",
  data(){
    return{
      message: ''
    }
  },
  methods:{
    async init() {
      try {
        const localstorageUser = JSON.parse(localStorage.getItem('user'))
        const inMemoryToken = localstorageUser.token
        const response = await fetch('http://10.64.92.213:5001/dashboard', {
          headers: {'Content-Type': 'application/json', 'token': inMemoryToken},
        });

        if(response.status != 200)
          throw Error;
        const content = await response.json();
        // console.log(content)
        this.message = `Welcome ${content.username}`;

        await store.dispatch('set_Auth', true).then(console.log("home dispatch"));
        // await store.actions.set_Auth(true);
      }catch (e){
        this.message = 'You are not logged in!'
        await store.dispatch('set_Auth', false);
        // await store.actions.set_Auth(false);
      }
    }
  },
  mounted(){
    this.init();
  }
}
</script>

<style>
.corrected{
  position: relative;
  right: 120px;
}
</style>