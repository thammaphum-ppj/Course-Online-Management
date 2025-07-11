<template>
  <div class="py-36">
    <div class="container mx-auto px-8 sm:px-96 mt-8">
      <h1 class="flex justify-center text-3xl font-bold mb-12">
        Change Password
      </h1>
      <div class="w-full sm:w-3/4 mx-auto">
        <div class="mb-4">
          <label for="newpassword" class="block text-gray-700 font-bold mb-2"
            >New Password</label
          >
          <input
            type="password"
            id="newpassword"
            v-model="user.password"
            class="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div class="mb-4">
          <label
            for="confirmpassword"
            class="block text-gray-700 font-bold mb-2"
            >Confirm Password</label
          >
          <input
            type="password"
            id="confirmpassword"
            v-model="confirmPassword"
            class="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div class="flex justify-center mt-10 space-x-4">
          <button
            @click="updateUserPassword()"
            class="bg-sky-700 text-white px-9 py-2 rounded hover:shadow-xl hover:bg-sky-800"
          >
            Submit
          </button>
          <button
            @click="cancel"
            class="bg-gray-500 text-white px-9 py-2 rounded hover:shadow-xl hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      user: {},
      password: "",
      confirmPassword: "",
      payload: {
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    async updateUserPassword() {
      if (
        !this.user.fname ||
        !this.user.lname ||
        !this.user.email ||
        !this.user.password ||
        !this.confirmPassword
      ) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all fields!",
        });
        return;
      }

      if (this.user.password !== this.confirmPassword) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Passwords do not match!",
        });
        return;
      }

      await this.$store.dispatch("user/updateUserPassword", {
        userId: this.user.id,
        newData: this.user,
      });

      localStorage.setItem("user", JSON.stringify(this.user));

      this.clearForm();
      console.log("User information updated successfully!");
    },

    clearForm() {
      this.user = {
        password: "",
      };
      this.confirmPassword = "";
    },
    cancel() {
      this.$router.push("/home"); 
    },
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log("user", this.user);
  },
};
</script>

<style scoped>
@media (min-width: 640px) {
  .container {
    max-width: 40rem;
  }
}
</style>
