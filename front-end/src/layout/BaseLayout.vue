<template>
  <div class="flex flex-col min-h-screen">
    <div class="fixed top-0 left-0 w-full z-10">
      <div @click="checkUserActive" v-if="role !== 'admin'">
        <NavbarLogin />
      </div>
    </div>
    <div class="">
      <div @click="checkUserActive" v-if="role == 'admin'">
        <MasterVue />
      </div>
      <div @click="checkUserActive" v-else>
        <RouterView />
      </div>
    </div>
    <Footers v-if="role !== 'admin'" class="mt-auto" />
  </div>
</template>

<script>
import MasterVue from "./Master.vue";
import Footers from "./Footers.vue";
import NavbarLogin from "@/components/NavbarLogin.vue";
import { mapState } from "vuex";
import Swal from "sweetalert2";


export default {
  components: {
    MasterVue,
    Footers,
    NavbarLogin,
  },
  data() {
    return {
      role: localStorage.getItem("role"),
      userNow: JSON.parse(localStorage.getItem('user'))
    };
  },
  computed: mapState({
    user: (state) => state.user.user,
  }),

  async mounted() {
    console.log("Role:", this.role);
    await this.getData();
    await this.checkUserActive()
  },
  methods: {
    async getData() {
      await this.$store.dispatch("user/getUser");
      console.log('userrr', this.user);
    },
    async checkUserActive() {
      await this.$store.dispatch("user/getUser");
      console.log('userrr', this.user);
      for (const item of this.user) {
        if (item.id == this.userNow.id && item.active == false) {
          console.log('checkUserActive', this.userNow.id);
          console.log('okokok');
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Your account has been disabled.",
          });
          await this.$store.dispatch("auth/logout");
        }
      }
    },
    logClick() {
      console.log("MasterVue clickedssssssssssssssss");
    },
  },

};
</script>

<style scoped></style>
