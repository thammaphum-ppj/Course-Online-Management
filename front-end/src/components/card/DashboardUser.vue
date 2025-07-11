<template>
  <v-card
    class="mx-auto w-96 drop-shadow-xl hover:shadow-xl"
    max-width="400"
    style="background-color: #818cf8"
  >
    <v-card-text class="flex justify-start">
      <p class="text-h4 font-weight-black text-white mt-1">User</p>
    </v-card-text>

    <div class="px-8 flex items-center">
      <div
        class="rounded-full bg-white w-12 h-12 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#0ea5e9"
          class="w-7 h-7"
        >
          <path
            d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"
          />
        </svg>
      </div>
      <p class="text-4xl hover:text-sky-900 text-sky-100 ml-8">
        {{ users.count }}
      </p>
      <p class="text-2xl text-gray-200 ml-4 py-4">user</p>
    </div>

    <v-card-actions class="text-sky-200">
      <v-btn
        href="/usermanage"
        text="Manage User"
        class="absolute top-0 left-56 hover:text-sky-800 hover:bg-indigo-200"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { State } from "@amcharts/amcharts5/.internal/core/util/States";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      users: (State) => State.user.users,
    }),
  },
  async mounted() {
    this.countUser();
  },
  methods: {
    async countUser() {
      await this.$store.dispatch("user/countUser");
      console.log(this.users);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
