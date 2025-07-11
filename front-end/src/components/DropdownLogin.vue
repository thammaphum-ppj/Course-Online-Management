<template>
  <div class="menu-item" @click="isOpen = !isOpen">
    <a href="#">
      {{ title }}
    </a>
    <a>{{ userEmail.email }}</a>
    <svg viewBox="0 0 1030 638" width="10">
      <path
        d="M1017 68L541 626q-11 12-26 12t-26-12L13 68Q-3 49 6 24.5T39 0h952q24 0 33 24.5t-7 43.5z"
        fill="#4A6FA5"
      ></path>
    </svg>
    <transition name="fade" appear>
      <div class="sub-menu" v-if="isOpen">
        <div v-for="(item, i) in items" :key="i" class="sub-menu-item">
          <a :href="item.link" @click="logout(item)" class="full-link">
            {{ item.title }}
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "dropdown",
  props: ["title", "items"],
  data() {
    return {
      isOpen: false,
      userEmail: {}
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.userEmail = user;
    }

  },
  methods: {
    async logout(item) {
      console.log("logout", item.title);

      if (item.title === "Logout") {
        await this.$store.dispatch("auth/logout");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        localStorage.removeItem("accessToken");
        router.push("/homepage");
      }
    },
  },
};
</script>

<style scoped>
nav .menu-item {
  position: relative;
}

nav .menu-item a {
  display: block;
  padding: 8px 12px;
}

nav .menu-item svg {
  width: 10px;
  margin-left: 10px;
}

nav .sub-menu {
  position: absolute;
  /* background-color: #34a6f2; */
  top: 100%;
  left: 0;
  width: max-content;
  border-radius: 0 16px 16px 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

nav .sub-menu-item {
  padding: 8px 12px;
  background-color: #bae6fd;
}

nav .sub-menu-item:hover {
  background-color: rgb(73, 190, 253);
}

.full-link {
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
