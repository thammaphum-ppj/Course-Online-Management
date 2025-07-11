<template>
  <div class="flex">
    <Sidebar :dataOpenSideBar="openSidebar" />
    <div class="w-full">
      
      <Header :dataOpenSideBar="openSidebar" :clickHambuger="toggleSidebar" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
export default {
  components: { Header, Sidebar },
  data() {
    return {
      openSidebar: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.openSidebar = !this.openSidebar;
    },
  },
};
</script>

<style></style>
