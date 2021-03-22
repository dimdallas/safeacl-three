<template>
  <v-content>
    <side-nav/>
    <v-card width="500" class="teal mx-auto corrected">
      <v-card-title class="white--text">Home</v-card-title>
      <v-card-text class="white--text">
        {{ message }}
      </v-card-text>
    </v-card>
  </v-content>
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
        const response = await fetch('http://localhost:5001/dashboard', {
          headers: {'Content-Type': 'application/json', 'token': inMemoryToken},
        });

        if(response.status != 200)
          throw Error;
        const content = await response.json();
        console.log(content)
        this.message = `Welcome ${content.username}`;

        await store.dispatch('setAuth', true);
      }catch (e){
        this.message = 'Lorem ipsum dolor sit amet,\n' +
            '        consectetur adipiscing elit,\n' +
            '        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n' +
            '        Ut enim ad minim veniam,\n' +
            '        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n' +
            '        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n' +
            '        Excepteur sint occaecat cupidatat non proident,\n' +
            '        sunt in culpa qui officia deserunt mollit anim id est laborum.'
        await store.dispatch('setAuth', false);
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