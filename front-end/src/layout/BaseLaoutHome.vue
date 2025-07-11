<template>
  <div class="flex flex-col min-h-screen">
    <div class="fixed top-0 left-0 w-full z-10">
      <div v-if="role !== 'admin'">
        <Navbar />
      </div>
    </div>
    <div class="flex-grow"> 
      <div v-if="role == 'admin'">
        <MasterVue />
      </div>
      <div v-else>
        <RouterView />
      </div>
    </div>
    <Footers v-if="role !== 'admin'" class="mt-auto" />
  </div>
</template>
  
  <script>
  import MasterVue from "./Master.vue";
  import Footers from "./Footers.vue";
  import Navbar from "./Navbar.vue";
  
  export default {
    components: {
      Navbar,
      Footers,
      MasterVue,
    //   NavbarLogin,
    },
    data() {
      return {
        role: localStorage.getItem("role"),
      };
    },
  
    mounted() {
      console.log("ff", this.role);
    },
  };
  </script>
  
  <style></style>
  