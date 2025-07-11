<template>
    <div class="mx-auto mt-28 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl">
    <h2 class="text-3xl font-bold text-center">Create Account</h2>

    <div
      class="flex items-center flex-col w-full my-8 border-gray-200 rounded-lg"
    >
      <div class="flex flex-col w-full md:w-96 mb-4">
        <label class="mb-2 text-gray-700">
          First name <span class="text-red-600">*</span>
        </label>
          <input type="text" class="form-input border border-gray-300 rounded-md px-2 py-2 w-full" v-model="fname" />
          <span class="text-red-600">{{ fnameError }}</span>
        </div>

        <div class="flex flex-col w-full md:w-96 mb-4">
          <label class="mb-2 text-gray-700">
            Last name <span class="text-red-600">*</span>
          </label>
          <input type="text" class="form-input border border-gray-300 rounded-md px-2 py-2 w-full" v-model="lname" />
          <span class="text-red-600">{{ lnameError }}</span>
        </div>

        <div class="flex flex-col w-full md:w-96 mb-4">
          <label class="mb-2 text-gray-700">
            Email <span class="text-red-600">*</span>
          </label>
          <input type="email" class="form-input border border-gray-300 rounded-md px-2 py-2 w-full" v-model="email" />
          <span class="text-red-600">{{ emailError }}</span>
        </div>

        <div class="flex flex-col w-full md:w-96 mb-4">
          <label class="mb-2 text-gray-700">
            Password <span class="text-red-600">*</span>
          </label>
          <input type="password" class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
            v-model="password" />
          <span class="text-red-600">{{ passwordError }}</span>
        </div>

        <div class="flex flex-col w-full md:w-96 mb-4">
          <label class="mb-2 text-gray-700">
            Confirm password <span class="text-red-600">*</span>
          </label>
          <input type="password" class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
            v-model="confirmPassword" />
          <span class="text-red-600">{{ confirmPasswordError }}</span>
        </div>

        <div class="flex flex-col w-full md:w-96 mb-4">
          <label class="mb-2 text-gray-700">
            Tel. <span class="text-red-600">*</span>
          </label>
          <input type="tel" class="form-input border border-gray-300 rounded-md px-2 py-2 w-full" v-model="phone" />
          <span class="text-red-600">{{ phoneError }}</span>
        </div>
        <div class="flex flex-col w-full md:w-96 mb-4">
        <button @click="handleSubmit"
          class="w-full mt-2 md:w-96 mb-4 bg-sky-600 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-800">
          Create Account
        </button>
      </div>
      </div>
    </div>

</template>

<script>
export default {
  data() {
    return {
      fname: "",
      lname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      fnameError: null,
      lnameError: null,
      emailError: null,
      passwordError: null,
      confirmPasswordError: null,
      phoneError: null,
    };
  },
  computed: {
    passwordMatch() {
      return this.password === this.confirmPassword;
    },
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault();
      this.validateForm();

      if (
        this.fnameError ||
        this.lnameError ||
        this.emailError ||
        this.passwordError ||
        this.confirmPasswordError ||
        this.phoneError ||
        !this.passwordMatch
      ) {
        return; // Stop form submission if there are errors
      }

      this.createUser();
    },
    async createUser() {
      const payload = {
        fname: this.fname,
        lname: this.lname,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        phone: this.phone,
        roleId: 2,
      };
      await this.$store.dispatch("user/createUser", payload);
      console.log("payload", payload);
    },
    validateForm() {
      if (!this.fname.trim()) {
        this.fnameError = "Please enter first name";
      } else {
        this.fnameError = null;
      }

      if (!this.lname.trim()) {
        this.lnameError = "Please enter last name";
      } else {
        this.lnameError = null;
      }

      // Validate email
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!this.email.trim()) {
        this.emailError = "Please enter an email";
      } else if (!emailPattern.test(this.email)) {
        this.emailError = "Invalid email";
      } else {
        this.emailError = null;
      }

      // Validate password
      if (!this.password.trim()) {
        this.passwordError = "Please enter a password";
      } else if (this.password.length < 6) {
        this.passwordError = "Password must be at least 6 characters";
      } else {
        this.passwordError = null;
      }

      // Validate confirm password
      if (!this.confirmPassword.trim()) {
        this.confirmPasswordError = "Please confirm your password";
      } else if (this.password !== this.confirmPassword) {
        this.confirmPasswordError = "Confirm password incorrect";
      } else {
        this.confirmPasswordError = null;
      }

      // Validate phone
      const phonePattern = /^\d{10}$/;
      if (!this.phone.trim()) {
        this.phoneError = "Please enter a phone number.";
      } else if (this.phone.length !== 10) {
        this.phoneError = "Phone number must be exactly 10 digits";
      } else if (!phonePattern.test(this.phone)) {
        this.phoneError = "Invalid phone number";
      } else {
        this.phoneError = null;
      }
    },
  },
};
</script>
