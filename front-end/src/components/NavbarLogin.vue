<template>
  <nav class="navbar-container flex justify-between items-center p-4">
    <div class="flex items-center">
      <h1 class="course text-xl font-bold text-sky-800 ">Course-Online</h1>
      <div class="menu-item cursor-pointer" @click="$router.push('/home')"><a>Home</a></div>
      <div class="menu-item cursor-pointer" @click="$router.push('/allcourse')"><a>All Course</a></div>
    </div>
    <DropdownLogin
      class="menu-item dropdown-item"
      :items="services"
    />
  </nav>
</template>

<script>
import DropdownLogin from './DropdownLogin.vue';

export default {
  name: 'NavbarLogin',
  components: {
    DropdownLogin,
  },
  data() {
    return {
      services: [
        {
          title: 'My Course',
          link: '/mycourse',
        },
        {
          title: 'Interested Course',
          link: '/interested',
        },
        {
          title: 'Edit Profile',
          link: '/edit-profile',
        },
        {
          title: "Change Password",
          link: "/change-password",
        },
        {
          title: "Logout",
          link: "/homepage",
        },
      ],
      userEmail: '',
    };
  },
};
</script>

<style scoped>
.navbar-container {
  background-color: #bde4f9;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.75rem 1rem;
  height: 3.75rem; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 50;
}

.menu-item {
  color: #104a83;
  font-size: 1.125rem; 
  padding: 1rem 1rem;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center; 
  transition: background-color 0.3s, color 0.3s; 
  cursor: pointer;
}

.menu-item:hover {
  background-color: #43bbfc;
  color: #054364;
}

.menu-item a {
  color: inherit;
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}

.dropdown-item {
  padding: 0 1rem;
  position: relative;
}
.course {
  margin-right: 950px;
}

.dropdown-item .dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100; 
  min-width: 200px; 
}

.dropdown-item .dropdown-menu a {
  color: #022a65;
  font-size: 1.125rem; 
  padding: 1rem;
  text-decoration: none;
  display: block;
  transition: background-color 0.3s, color 0.3s; 
}

.dropdown-item .dropdown-menu a:hover {
  background-color: #c7ebff;
  color: #016d9e;
}
</style>
