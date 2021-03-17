<template>
  <v-main>
    <!-- <v-card width="500" class="teal mx-auto">
      <v-card-title class="white--text">Home</v-card-title>
      <v-card-text class="white--text">
        {{ message }}
      </v-card-text>
    </v-card> -->
    
  </v-main>
</template>

<script>
import store from "@/store/index";

export default {
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
        const response = await fetch('http://10.64.45.144:5001/dashboard', {
          headers: {'Content-Type': 'application/json', 'token': inMemoryToken},
        });

        const content = await response.json();
        // console.log(content)
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
    },
    async init2() {
      if(store.state.authenticated){
        try {
          const response = await fetch('http://localhost:8000/api/user', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
          });

          const content = await response.json();
          console.log(content)
          this.message = `Welcome ${content.name}`;

          await store.dispatch('setAuth', true);
        }catch (e) {
          await store.dispatch('setAuth', false);
        }
      }
      else {
        this.message = 'Lorem ipsum dolor sit amet,\n' +
            '        consectetur adipiscing elit,\n' +
            '        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n' +
            '        Ut enim ad minim veniam,\n' +
            '        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n' +
            '        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n' +
            '        Excepteur sint occaecat cupidatat non proident,\n' +
            '        sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    }
  },
  mounted(){
    this.init();
  }
}
</script>