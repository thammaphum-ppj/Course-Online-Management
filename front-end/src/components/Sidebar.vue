<template>
 <div
    :class="{
      'side-bar-visible': dataOpenSideBar,
      'side-bar-close': !dataOpenSideBar
    }"
    class="bg-sky-600 flex flex-col min-h-screen transition-all duration-400 ease-in-out"
    id="side-bar"
  >
  <div class="bg-sky-600 flex justify-center items-center">
      <div v-show="dataOpenSideBar" class="text-xl font-bold text-center flex items-center justify-center text-white h-full">
        Course-online
      </div>
      <div class="mt-8">
        <img
          v-show="!dataOpenSideBar"
          src="https://img.pikbest.com/png-images/qiantu/q-version-cute-cartoon-cute-little-animal-zodiac-pig_2721353.png!sw800"
          class="p-1 w-8 h-8 rounded-full ring-2 ring-gray-100 dark:ring-gray-500"
          alt="Avatar"
        />
      </div>
    </div>
    <div class="flex flex-col justify-between bg-sky-600">
      <div class="menu-man text-left px-2 whitespace-nowrap">
        <div class="profile flex justify-center items-center text-center p-5">
          <div class="text-center text-white" v-show="dataOpenSideBar">
            <div class="flex justify-center">
              <img
                src="https://img.pikbest.com/png-images/qiantu/q-version-cute-cartoon-cute-little-animal-zodiac-pig_2721353.png!sw800"
                class="p-1 w-24 h-24 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 mb-4"
                alt="Avatar"
              />
            </div>
            <h5 class="text-xl font-medium leading-tight mb-2">
              {{ adminEmail.email }}
            </h5>
            <p class="text-white">Admin</p>
          </div>
        </div>
        <div
          @click="$router.push('/Dashboard')"
          class="px-1 hover:bg-sky-400 hover:text-sky-800 py-3 rounded-md cursor-pointer text-gray-300"
        >
          <div class="mx-2 flex space-x-2">
            <span v-tooltip.right="'Home'"></span>
            <span class="absolute bottom left-9 px-4" v-show="dataOpenSideBar"
              >Home</span
            >
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-7 h-7"
          >
            <path
              d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"
            />
            <path
              d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"
            />
          </svg>
        </div>
        <div
          @click="$router.push('/Inbox')"
          class="px-1 hover:bg-sky-400 hover:text-sky-800 py-3 rounded-md cursor-pointer text-gray-300"
        >
          <router-link to="/Inbox" class="px-2 flex space-x-2"
            ><span class="" v-tooltip.right="'Inbox'"></span>
            <span class="absolute bottom left-9 px-4" v-show="dataOpenSideBar"
              >Inbox</span
            ></router-link
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 0 0-1.032-.211 50.89 50.89 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a48.527 48.527 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979Z"
            />
            <path
              d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0 0 15.75 7.5Z"
            />
          </svg>
        </div>
        <div
          @click="$router.push('/coursemanage')"
          class="px-1 hover:bg-sky-400 hover:text-sky-800 py-3 rounded-md cursor-pointer text-gray-300"
        >
          <router-link to="/coursemanage" class="px-2 flex space-x-2"
            ><span class="" v-tooltip.right="'Manage Course'"></span>
            <span class="absolute bottom left-9 px-4" v-show="dataOpenSideBar"
              >Manage Course</span
            ></router-link
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z"
            />
          </svg>
        </div>
        <div
          @click="$router.push('/usermanage')"
          class="px-1 hover:bg-sky-400 hover:text-sky-800 py-3 rounded-md cursor-pointer text-gray-300"
        >
          <router-link to="/usermanage" class="px-2 flex space-x-2"
            ><span class="" v-tooltip.right="'Manage User'"></span>
            <span class="absolute bottom left-9 px-4" v-show="dataOpenSideBar"
              >Manage User</span
            ></router-link
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"
            />
          </svg>
        </div>
        <div
          @click="$router.push('/category')"
          class="px-1 hover:bg-sky-400 hover:text-sky-800 py-3 rounded-md cursor-pointer text-gray-300"
        >
          <router-link to="/category" class="px-2 flex space-x-2"
            ><span class="" v-tooltip.right="'Manage Category'"></span>
            <span class="absolute bottom left-9 px-4" v-show="dataOpenSideBar"
              >Manage Category</span
            ></router-link
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path d="M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z" />
            <path
              fill-rule="evenodd"
              d="M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div
          @click="$router.push('/teacherprofile')"
          class="px-1 hover:bg-sky-400 hover:text-sky-800 py-3 rounded-md cursor-pointer text-gray-300"
        >
          <router-link to="/teacherprofile" class="px-2 flex space-x-2"
            ><span class="" v-tooltip.right="'teacherprofile'"></span>
            <span class="absolute bottom left-9 px-4" v-show="dataOpenSideBar"
              >Edit Profile Teacher</span
            ></router-link
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fill-rule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataOpenSideBar: Boolean,
  },
  data() {
    return {
      adminEmail: "",
    };
  },
  mounted() {
    this.adminEmail = JSON.parse(localStorage.getItem("user"));
  },
};
</script>

<style lang="scss" scoped>
#side-bar {
  width: 250px;
  transition: width 0.4s;
}

.menu-man {
  padding-right: 20px;
}

.p-tooltip-text {
  font-size: 10px !important;
}

.side-bar-visible {
  width: 250px !important;
}

.side-bar-close {
  width: 50px !important;
}

</style>
