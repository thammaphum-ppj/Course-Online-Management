<template>
  <div class="container mx-auto mt-2 px-4 md:px-16 lg:px-64">
    <h2 class="text-3xl font-bold text-center mt-22 md:mt-12 lg:mt-24">
      Edit Profile
    </h2>
    <div
      class="flex flex-col items-center w-full py-10 border-gray-200 rounded-lg"
    >
      <div class="flex flex-col w-96 py-1">
        <label class="mb-2 text-gray-700 ">Firstname</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="user.fname"
        />
        <span class="text-red-600">{{ fnameError }}</span>
      </div>

      <div class="flex flex-col w-96 py-1">
        <label class="mb-2 text-gray-700">Lastname</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="user.lname"
        />
      </div>

      <div class="flex flex-col w-96 py-1">
        <label class="mb-2 text-gray-700">Email</label>
        <input
          type="email"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="user.email"
        />
      </div>

      <div class="flex flex-col mb-2 w-96 py-1">
        <label class="mb-2 text-gray-700">Phone</label>
        <input
          type="tel"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="user.phone"
        />
      </div>

      <div class="mt-2 w-96">
        <button
          @click="updateUser()"
          class="w-full bg-sky-600 text-white font-bold py-2 px-10 rounded-md hover:bg-sky-800"
        >
          Save
        </button>
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
      fname: "",
      lname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      payload: {
        fname: "",
        lname: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    async updateUser() {
      if (
        !this.user.fname ||
        !this.user.lname ||
        !this.user.email ||
        !this.user.phone
      ) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all fields!",
        });
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.user.email)) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a valid email address!",
        });
        return;
      }
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(this.user.phone)) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a valid phone number!",
        });
        return;
      }

      await this.$store.dispatch("user/updateUser", {
        userId: this.user.id,
        newData: this.user,
      });

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(this.user));

      this.clearForm();
      console.log("User information updated successfully!");
    },

    clearForm() {
      this.user = {
        fname: "",
        lname: "",
        email: "",
        phone: "",
      };
      this.confirmPassword = "";
    },
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log("user", this.user);
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}

.text-gray-700 {
  color: #4a5568;
}

.text-red-600 {
  color: #e53e3e;
}

.form-input {
  outline: none;
}

@media (min-width: 640px) {
  .form-input {
    font-size: 16px;
  }
}
</style>
