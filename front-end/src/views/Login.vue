<template>
  <div
    class="mx-auto mt-32 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl"
  >
    <h2 class="text-2xl sm:text-3xl font-bold text-center">Login Account</h2>

    <form @submit.prevent="Login" class="mt-6 flex flex-col items-center">
      <div>
        <div class="mt-6 w-full max-w-lg">
          <label for="email" class="block mb-2"
            >Email <span style="color: red">*</span></label
          >
          <input
            type="email"
            id="email"
            v-model="payload.email"
            class="w-full p-2 border rounded-md focus:outline-none"
            @keydown.enter="submitForm"
          />
        </div>
      </div>

      <div>
        <div class="mt-6 w-full max-w-lg">
          <label for="password" class="block mb-4"
            >Password <span style="color: red">*</span></label
          >
          <input
            type="password"
            id="password"
            v-model="payload.password"
            class="w-full p-2 border rounded-md focus:outline-none"
            @keydown.enter="submitForm"
          />
        </div>
      </div>

      <div class="mt-6 w-full max-w-lg flex justify-center">
        <button
          type="submit"
          class="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-800 transition-colors"
        >
          Login
        </button>
      </div>
    </form>

    <div class="mt-6 flex justify-center">
      <p>
        Don't have an account?
        <a href="/register" class="text-sky-600 hover:text-sky-800"
          >Create Account</a
        >
      </p>
    </div>
    <!-- <div class="mt-5 flex justify-center">
      <p>
        Have you forgot your password?
        <a href="/change-password" class="text-sky-600 hover:text-sky-800"
          >Change password</a
        >
      </p> -->
    <!-- </div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      payload: {
        email: "",
        password: "",
      },
    };
  },

  computed: {
    ...mapState({
      profile: (state) => state.auth.profile,
    }),
  },

  methods: {
    async Login() {
      await this.$store.dispatch("auth/login", this.payload);
    },

    submitForm() {
      this.Login();
    },
  },
};
</script>

<style scoped>
@media (min-width: 640px) {
  .container {
    max-width: 24rem;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 36rem;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 48rem;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 40rem;
  }
}

input,
button {
  max-width: 100%;
  width: 20rem;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
