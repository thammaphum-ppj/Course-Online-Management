<template>
  <div class=""> 
  <v-card
  class="mx-auto w-96 drop-shadow-xl hover:shadow-xl"
    max-width="400"
    style="background-color: #22d3ee"
  >
    <v-card-text class="flex justify-start">
      <p class="text-h4 font-weight-black text-white mt-1">Inbox</p>
    </v-card-text>
    <div class="px-8 flex items-center">
      <div
        class="rounded-full bg-white w-12 h-12 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#0ea5e9"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
          />
        </svg>
      </div>
      <p class="text-4xl hover:text-sky-900 text-sky-200 ml-8">
        {{ questions.count }}
      </p>
      <p class="text-2xl text-gray-200 ml-4 py-4">Message</p>
    </div>

    <v-card-actions class="text-sky-800">
      <v-btn
        href="/inbox"
        text="View inbox"
        class="absolute top-0 left-64 hover:text-sky-800 hover:bg-cyan-200"
      ></v-btn>
    </v-card-actions>
  </v-card>
</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      questions: (State) => State.inbox.questions,
    }),
  },
  async mounted() {
    this.countQuestion();
  },
  methods: {
    async countQuestion() {
      await this.$store.dispatch("inbox/countQuestion");
      console.log(this.questions);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
