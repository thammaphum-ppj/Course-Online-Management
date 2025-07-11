<template>
  <div class="px-8 mt-8">
    <div class="head-course">
      <h1>Inbox</h1>
    </div>
  </div>
  <div class="mt-9">
    <v-data-table-virtual :headers="headers" :items="userEmail">
      <template #item="{ item, index }">
        <tr :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ formatDate(item.date) }}</td>
          <td>{{ (item.email) }}</td>
          <td>{{ (item.message) }}</td>
        </tr>
      </template>

            <!-- <template v-slot:[`item.name`]="{ item }">
        <b class="border-2 border-red-500">{{ item.name }}</b>
      </template> -->

      <!-- <template #item="{ item }">
        <tr :key="item">
          <td
            class="text-between"
            style="width: 300px; max-width: 300px; word-wrap: break-word"
          >
            {{ formatDate(item.date) }}
          </td>
          <td style="width: 300px; max-width: 300px; word-wrap: break-word">
            {{ item.email }}
          </td>
          <td style="width: 300px; max-width: 300px; word-wrap: break-word">
            {{ item.message }}
          </td>
        </tr>
      </template> -->
    </v-data-table-virtual>
  </div>
</template>

<script>
import { mapState } from "vuex";
import _ from "lodash";
export default {
  data: () => ({
    headers: [
    {
        title: "No.", 
        align: "start", 
        value: "no"

      },
      {
        title: "Date",
        align: "start",
        value: "date",
      },
      {
        title: "Email",
        align: "start",
        value: "email",
      },
      {
        title: "Message",
        align: "start",
        value: "message",
      },
      
    ],
    userEmail: [],
  }),
  computed: {
    ...mapState({
      users: (state) => state.user.users,
    }),
  },
  async mounted() {
    this.getData();
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    async getData() {
      const payload = {
        question: true,
      };
      await this.$store.dispatch("user/getUser", payload);
      console.log("user", this.users);
      // await this.$store.dispatch("inbox/getEmail");
      // this.emails = JSON.parse(JSON.stringify(this.inbox));
      this.setDataEmail(this.users);
    },
    setDataEmail(users) {
      console.log("users", users.length);
      const setData = [];
      _.map(users, (item) => {
        if (!_.isEmpty(item.questions)) {
          console.log(
            "item.questions[item?.questions?.length - 1].createdAt",
            item.questions
          );
          setData.push({
            date: item.questions[item?.questions?.length - 1].createdAt,
            email: item.email,
            message: item.questions[item?.questions?.length - 1].message,
          });
        } else {
          // setData.push({
          //   date: "",
          //   email: item.email,
          //   message: "",
          // });
        }
      });
      this.userEmail = setData;
      console.log("useremail",this.userEmail);
    },
  },
};
</script>

<style scoped>
.head-course h1 {
  font-size: 30px;
  color: rgb(11, 94, 188);
  border-bottom: 1px solid #d9d9d9;
  font-style: italic;
}
</style>
