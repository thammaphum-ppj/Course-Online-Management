<template lang="">
  <div class="px-8 mt-8">
    <h1 class="text-4xl mb-10 text-center bg-gray-100 px-4 py-4 rounded-lg">
      Completed course
    </h1>
  </div>
  <div>
    <v-data-table-virtual :headers="headers" :items="order" height="450">
      <template #item="{ item, index }">
        <tr :key="index">
          <td class="table-cell">{{ index + 1 }}</td>
          <td class="table-cell">{{ formatDate(item.createdAt) }}</td>
          <td class="table-cell">{{ formatDate(item.startdate) }}</td>
          <td class="table-cell">{{ formatDate(item.enddate) }}</td>
          <td class="table-cell">{{ item.user.email }}</td>
          <td class="table-cell">{{ item.course ? item.course.courseName : "None" }}</td>
          <td class="table-cell">{{ item.course && item.course.categorys ? item.course.categorys.name : "None" }}</td>
          <td class="table-cell">{{ item.course ? formatPrice(item.course.price) : "None" }}</td>
         
        </tr>
      </template>
    </v-data-table-virtual>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { StatusOrder } from "@/constants/enum";

export default {
  data() {
    return {
      headers: [
        { title: "No.", align: "start", value: "index" },
        { title: "Date", align: "start", value: "createdAt", sortable: true },
        { title: "Start Course", align: "start", value: "startDate", sortable: true },
        { title: "End Course", align: "start", value: "endDate", sortable: true },
        { title: "Email", align: "start", value: "email", sortable: true },
        { title: "Course Name", align: "start", value: "courseName", sortable: true },
        { title: "Category", align: "start", value: "categorys.name", sortable: true },
        { title: "Price", align: "start", value: "price", sortable: true },
      ],
    };
  },
  computed: {
    ...mapState({
      order: (state) => state.order.order,
      startDate: state => state.order.startDate,
      endDate: state => state.order.endDate,
    }),
  },
  async mounted() {
    await this.getOrder();
  },
  methods: {
    formatDate(date) {
      // if (date && Date.parse(date)) {
        return new Date(date).toLocaleString();
      // } else {
        // return "None";
      // }
    },
    async getOrder() {
      const payload = { status: StatusOrder.Endcourse };
      await this.$store.dispatch("order/getOrder", payload);
      console.log("Fetched Orders:", this.order);
    },
    formatPrice(price) {
      return price
        .toLocaleString("en-US", { style: "currency", currency: "THB" })
        .replace("THB", "฿");
    },
    mounted() {
    console.log("Start Date:", this.startdate);
    console.log("End Date:", this.enddate);
  }
  },
};
</script>

<style scoped>
.table-cell {
  max-width: 100px;
  word-wrap: break-word;
  white-space: normal;
}
</style> 