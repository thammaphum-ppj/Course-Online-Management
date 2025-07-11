<template>
  <div class="flex justify-center items-center">
    <div class="md:w-2/3 lg:w-2/3 w-80 lg:max-w-screen-lg p-8 bg-stone-200 rounded-lg shadow-lg hover:shadow-xl">
      <div class="flex justify-center">
        <div class="w-48 h-48 rounded-full overflow-hidden shadow-xl border-4 transition hover:scale-110 duration-300">
          <img
            :src="`${img}/${teacher.userImage}`"
            alt="Teacher's Image"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
      <div class="mt-4">
        <h2 class="text-center text-3xl text-sky-700 font-semibold hover:text-sky-500">
          {{ teacher.fname }} {{ teacher.lname }}
        </h2>
        <div class="text-md text-gray-700 mt-2 text-center">
          <p>
            <b> Email: </b> 
            <span class="font-medium text-lg hover:text-gray-400">{{ teacher.email }}</span>
          </p>
          <p>
           <b> Phone: </b> 
            <span class="font-medium text-lg hover:text-gray-400">{{ teacher.phone }}</span>
          </p>
        </div>
        <p class="text-center text-sm text-gray-600 mt-2 hover:text-gray-400 break-words">
          <b class="">Information: </b> 
          {{ teacher.desc }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ENDPOINT } from "@/constants/endpoint";

export default {
  data() {
    return {
      img: ENDPOINT.IMG,
      teacher: {},
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  async mounted() {
    this.getTeacher();
  },
  methods: {
    async getTeacher() {
      try {
        await this.$store.dispatch("user/getTeacher");
        this.teacher = this.user;
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    },
  },
};
</script>

<style>
.v-img {
  object-fit: cover;
}
</style>
