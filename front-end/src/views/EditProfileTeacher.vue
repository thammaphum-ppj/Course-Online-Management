<template>
  <div class="mx-auto">
    <h2 class="text-3xl font-bold text-center my-6">Edit Profile Teacher</h2>
    <div class="flex items-center flex-col w-full max-w-lg mx-auto border-gray-200 rounded-lg">
      <div class="flex flex-col w-96">
        <label class="mb-2 text-gray-700">Firstname</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="teacher.fname"
        />
        <span class="text-red-500">{{ fnameError }}</span>
      </div>

      <div class="flex flex-col w-96 m-1">
        <label class="mb-2 text-gray-700">Lastname</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="teacher.lname"
        />
      </div>

      <div class="flex flex-col w-96 m-1">
        <label class="mb-2 text-gray-700">Email</label>
        <input
          type="email"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="teacher.email"
        />
      </div>


      <div class="flex flex-col w-96 m-1">
        <label class="mb-2 text-gray-700">Phone</label>
        <input
          type="tel"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="teacher.phone"
        />
      </div>
      <div class="flex flex-col w-96 m-1">
        <label class="mb-2 text-gray-700">Information</label>
        <textarea
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full h-32 resize-none overflow-auto"
          v-model="teacher.desc"
        ></textarea>
      </div>

      <div class="flex flex-col w-96 m-1">
        <label class="mb-2 text-gray-700">Link Facebook</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="teacher.linkFacebook"
        />
      </div>
      <div class="flex flex-col w-96 m-1">
        <label class="mb-2 text-gray-700">Link Email</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="teacher.linkEmail"
        />
      </div>
      <div class="flex flex-col w-96 m-1">
        <label class="mb-2 text-gray-700">Link Line</label>
        <input
          type="text"
          class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
          v-model="teacher.linkLine"
        />
      </div>
      <div class="flex flex-col mb-4 w-96">Picture</div>
      <div class="flex flex-col picture mr-11">
        <v-file-input
          variant="outlined"
          accept=".jpg,.png,.gif"
          label="Add Picture"
          placeholder="Pick an avatar"
          v-model="teacher.userImage"
        >
        </v-file-input>
      </div>
      <div class="flex flex-col w-96 py-3">
        <button
          @click="updateTeacher"
          class="w-full bg-sky-600 text-white font-bold py-2 rounded-md hover:bg-sky-800"
        >
          Save
        </button>

        
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";

export default {
  data() {
    return {
      teacher: {
        fname: "",
        lname: "",
        email: "",
        phone: "",
        desc: "",
        linkEmail: "",
        linkFacebook: "",
        linkLine: "",
        userImage: null,
      },
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  async mounted() {
    this.getTeacher();
  },
  methods: {
    async getTeacher() {
      try {
        await this.$store.dispatch("user/getTeacher");
        console.log("User data from Vuex:", this.user);
        this.teacher = { ...this.user };
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    },
    isWhitespaceOrEmpty(string) {
      return !string || !string.trim();
    },
    async updateTeacher() {
      if (
        this.isWhitespaceOrEmpty(this.teacher.fname) ||
        this.isWhitespaceOrEmpty(this.teacher.lname) ||
        this.isWhitespaceOrEmpty(this.teacher.email) ||
        this.isWhitespaceOrEmpty(this.teacher.phone)
      ) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill out all fields without whitespace!",
        });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.teacher.email)) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a valid email address!",
        });
        return;
      }

      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(this.teacher.phone)) {
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a valid phone number!",
        });
        return;
      }

      try {
        if (this.teacher.userImage instanceof File) {
          await this.$store.dispatch("user/updateTeacher", {
            newData: {
              fname: this.teacher.fname,
              lname: this.teacher.lname,
              phone: this.teacher.phone,
              email: this.teacher.email,
              desc: this.teacher.desc,
              linkEmail: this.teacher.linkEmail,
              linkFacebook: this.teacher.linkFacebook,
              linkLine: this.teacher.linkLine,
              userImage: this.teacher.userImage,
            },
          });
        } else {
          await this.$store.dispatch("user/updateTeachernoImage", {
            newData: {
              fname: this.teacher.fname,
              lname: this.teacher.lname,
              phone: this.teacher.phone,
              email: this.teacher.email,
              desc: this.teacher.desc,
              linkEmail: this.teacher.linkEmail,
              linkFacebook: this.teacher.linkFacebook,
              linkLine: this.teacher.linkLine,
            },
          });
        }
      } catch (error) {
        console.error("Error updating teacher profile:", error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 100%;
}

.picture {
  width: 82%;
}
</style>
