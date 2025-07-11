<template>
  <div>
    <button
      @click="togglePopup"
      v-if="!showPopup"
      class="fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg z-10"
    >
      <h1>Question ?</h1>
    </button>

    <transition name="fade">
      <div
        v-if="showPopup"
        class="fixed -bottom-1/4 right-10 transform -translate-y-1/2 bg-white rounded-lg p-6 shadow-lg z-10 h-94 w-80"
      >
        <h2 class="text-2xl mb-4">Question</h2>
        <button
          @click="togglePopup"
          class="absolute top-0 right-0 m-4 bg-transparent text-gray-600 hover:text-gray-800"
        >
          <span class="sr-only">Close</span>
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <input
          v-model="userEmail.email"
          type="email"
          placeholder="Email"
          class="border border-gray-300 rounded-md mb-4 w-full px-3 py-2"
          ref="emailInput"
        />

        <textarea
          v-model="message"
          placeholder="Message"
          class="border border-gray-300 rounded-md mb-4 w-full px-3 py-2 h-32"
        ></textarea>
        <div class="flex justify-end">
          <button
            @click="sentEmails"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mr-2"
          >
            Submit
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      showPopup: false,
      userEmail: { email: "" },
      message: "",
    };
  },
  methods: {
    togglePopup() {
      this.showPopup = !this.showPopup;
    },
    // async validateEmail(email) {
    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   console.log(emailRegex.test(email));
    //   return emailRegex.test(email)?true:false;
    // },
    async sentEmails() {
      try {
        if (!this.message.trim()) {
          Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Please enter your message!",
          });
          return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.userEmail.email)){
          await Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter a valid email address!",
          });
          return;
        }
        const payload = {
          email: this.userEmail.email,
          message: this.message,
        };
        await this.$store.dispatch("inbox/sentEmails", payload);
        this.togglePopup();

        this.userEmail.email = "";
        this.message = "";
      } catch (error) {
        console.error("Error sending email: ", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a valid email address!",
        });
      }
    },

    mounted() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        this.userEmail.email = user.email;
      }
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
