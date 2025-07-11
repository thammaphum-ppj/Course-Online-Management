<template>
  <v-card
  class="mx-auto w-96 drop-shadow-xl hover:shadow-xl"
    max-width="400"
    style="background-color: #60a5fa"
  >
    <v-card-text class="flex justify-start">
      <p class="text-h4 font-weight-black text-white mt-1">Course order</p>
    </v-card-text>
    <div class="px-8 flex items-center">
      <div
        class="rounded-full bg-white w-12 h-12 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#0ea5e9"
          class="w-8 h-8"
        >
          <path
            d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z"
          />
        </svg>
      </div>
      <p class="text-4xl hover:text-sky-900 text-sky-100 ml-8">
        {{ order.count }}
      </p>
      <p class="text-2xl text-gray-200 ml-4 py-4">order</p>
    </div>

    <v-card-actions class="text-blue-800">
      <v-btn
        href="/coursemanage"
        text="View order"
        class="absolute top-0 left-64 hover:text-sky-800 hover:bg-blue-200"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      order: (State) => State.order.order,
    }),
  },
  async mounted() {
    this.countWaitingOrder();
  },
  methods: {
    async countWaitingOrder() {
      await this.$store.dispatch("order/countWaitingOrder");
      console.log(this.order);
    },
  },
};
</script>

<style></style>
