<template>
  <div class="py-5 px-10 md:px-8">
    <div class="head-course">
      <h1>Dashboard</h1>
      <div
        class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 justify-item-center"
      >
        <div class="py-8 ">
          <button @click="navigateAndRefresh('/usermanage')">
            <DashboardUser />
          </button>
        </div>

        <div class="py-8 ">
          <button @click="navigateAndRefresh('/courseorder')" class="">
            <DashboarCourse />
          </button>
        </div>

        <div class="py-8">
          <button @click="navigateAndRefresh('/inbox')">
            <DashboardInbox />
          </button>
        </div>

        <div class="">
          <button @click="navigateAndRefresh('/allconfrime')">
            <DashboarConfirme />
          </button>
        </div>

        <div class="">
          <button @click="navigateAndRefresh('/cancle-order')">
            <DashboardCancle />
          </button>
        </div>

        <div class="">
          <button @click="navigateAndRefresh('/endcourse')">
            <DashboardEndcourse/>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardUser from "@/components/card/DashboardUser.vue";
import DashboarCourse from "@/components/card/DashboardCourse.vue";
import DashboarConfirme from "@/components/card/DashboardConfirm.vue";
import DashboardInbox from "@/components/card/DashboardInbox.vue";
import DashboardCancle from "@/components/card/DashboardCancle.vue";
import DashboardEndcourse from "../components/card/DashboardEndcourse.vue"
export default {
  components: {
    DashboardUser,
    DashboarCourse,
    DashboarConfirme,
    DashboardInbox,
    DashboardCancle,
    DashboardEndcourse
  },
  beforeRouteEnter(to, from, next) {
    if (to.name === "Dashboard") {
      next((vm) => {
        vm.$router.go(0);
      });
    } else {
      next();
    }
  },
  methods: {
    navigateAndRefresh(route) {
      this.$router.push(route).then(() => {
        location.reload();
      });
    },
  },
};
</script>

<style scoped>
.head-course h1 {
  font-size: 30px;
  color: rgb(11, 94, 188);
  border-bottom: 1px solid #d9d9d9;
  font-style: italic;
}
</style>