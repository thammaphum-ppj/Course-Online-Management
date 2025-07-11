<template>
  <v-card
  class="mx-auto w-96 drop-shadow-xl hover:shadow-xl"
    max-width="400"
    style="background-color: #66ccff"
  >
    <v-card-text class="flex justify-start">
      <p class="text-h4 font-weight-black text-white mt-1">Canceled Orders</p>
    </v-card-text>
    <div class="px-8 flex items-center">
      <div
        class="rounded-full bg-white w-12 h-12 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#0ea5e9"
          class="size-6"
        >
          <path
            fill-rule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
      <p class="text-4xl hover:text-sky-900 text-sky-200 ml-8">
        {{ orderCancle.count }}
      </p>
      <p class="text-2xl text-gray-200 ml-4 py-4">order</p>
    </div>

    <v-card-actions class="text-sky-800">
      <v-btn
        href="/cancle-order"
        text="View order"
        class="absolute top-0 left-64 hover:text-sky-800 hover:bg-sky-200"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import order from "@/store/modules/order";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      orderCancle : (State) => State.order.orderCancle,
    }),
  },
  async mounted() {
    this.countCancleOrder();
  },
  methods: {
    async countCancleOrder() {
      await this.$store.dispatch("order/countCancleOrder");
      console.log(this.orderCancle);
    },
  },
};
</script>

<style></style>
