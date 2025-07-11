<template>
  <div
    class="bg-sky-200 fixed z-50 w-full text-sky-800 py-1 px-4 shadow md:flex justify-between item-center"
  >
    <div>
      <h1 class="py-3 text-xl font-bold text-sky-800 "> Course-Online</h1> 
      <!-- <img
        src="https://png.pngtree.com/png-clipart/20200710/original/pngtree-books-logo-png-image_4136028.jpg"
        alt="Course-Online Logo"
        class="h-12 w-auto mt-3 px-2"
      /> -->
    </div>

    <span
      @click="MenuOpen"
      class=" absolute md:hidden right-6 top-1.5 cursor-pointer text-4xl"
    >
      <i :class="[open ? 'text-sky-700' : 'text-sky-700']" class="inline-block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-6 sm:h-7 sm:w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
            v-if="open"
          ></path>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
            v-else
          ></path>
        </svg>
      </i>
    </span>

    <ul
      class="md:flex md:items-center md:px-0 px-10 md:pb pb-0 md:static absolute bg-sky-200 md:w-auto w-full top-25 duration-700 ease-in"
      :class="[open ? 'left-0' : 'left-[-100%]']"
    >
      <li
        :key="link.name"
        class="menu-item md:mx-4 md:my-0 my-3 group"
        v-for="link in Links"
      >
        <a
          :href="link.link"
          class="transition duration-500 ease-in-out box-border py-3 px-3 text-lg text-sky-800 hover:bg-sky-400 hover:text-sky-200"
          
        >
          {{ link.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";


export default {
  setup() {
    const open = ref(false);
    const Links = [
      { name: "Home", link: "/homepage" },
      { name: "All Course", link: "/guestallcourse" },
      { name: "Login", link: "/login" },
      { name: "Register", link: "/register" },
      // { name: "Add Course", link: "/addcourse"}
    ];
    function MenuOpen() {
      open.value = !open.value;
    }
    return { Links, open, MenuOpen };
  },
  

};
</script>
