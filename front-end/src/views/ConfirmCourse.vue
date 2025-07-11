<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600" persistent>
      <v-card class="dialog-card">
        <v-card-title class="dialog-card-title mt-8">Confirm your course</v-card-title>
        <v-card-text class="dialog-card-text">
          <v-row dense class="flex flex-col items-center">
            <v-col cols="12" md="12" sm="6" class=""></v-col>
            <div class="flex flex-col w-full m-2">
              <label class="mb-2 text-gray-700">Course Name</label>
              <input type="text" class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
                v-model="course.courseName" readonly />
            </div>
            <div class="flex flex-col w-full m-1">
              <label class="mb-2 text-gray-700">Price</label>
              <input type="text" class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
                v-model="formattedPrice" readonly />
            </div>
            <div class="flex flex-col w-full m-1">
              <label class="mb-3 text-gray-700">Description</label>
              <textarea
                id="detail"
                v-model="course.description"
                class="w-full p-2 border border-gray-300 rounded resize-none overflow-auto"
                readonly
                @input="autoResize"
              ></textarea>
            </div>

            <div class="flex flex-col w-full m-1">
              <label class="mb-2 text-gray-700">Email</label>
              <input type="text" class="form-input border border-gray-300 rounded-md px-2 py-2 w-full"
                v-model="userEmail.email" readonly />
            </div>
          </v-row>
        </v-card-text>
        <v-card-actions class="dialog-card-actions mt-3">
          <v-btn text="Close" variant="plain" @click="setClose"></v-btn>
          <v-btn color="primary" text="Confirm" variant="tonal" @click="checkOrder"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  props: {
    course: {
      type: Object,
      required: true,
    },
    openModal: {
      type: Boolean,
      required: true,
    },
    setCloseModal: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      dialog: this.openModal,
      userEmail: {
        email: "",
        id: null,
      },
      formattedPrice: "",
    };
  },
  watch: {
    openModal(newVal) {
      this.dialog = newVal;
    },
    course(newVal) {
      this.course.courseName = newVal.courseName;
      this.course.price = newVal.price;
      this.course.description = newVal.description;
      this.formattedPrice = `฿${newVal.price} `;
    },
  },
  methods: {
    setClose() {
      this.setCloseModal();
      this.dialog = false;
    },

    async checkOrder() {
      const payload = {
        courseId: this.course.id,
        userId: this.userEmail.id,
      };
      try {
        const orderExists = await this.$store.dispatch(
          "order/checkOrder",
          payload
        );
        this.setClose();

        if (orderExists) {
          const { isConfirmed } = await Swal.fire({
            title:
              "This course has already been purchased. Do you want to buy again?",
            text: `Course name: ${this.course.courseName}\n Price: THB ${this.course.price} `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Buy again",
            cancelButtonText: "Cancel",
          });

          if (isConfirmed) {
            this.createOrder();
          } else {
            this.dialog = true;
          }
        } else {
          const { isConfirmed } = await Swal.fire({
            title: "Do you want to buy this course?",
            text: `Course name: ${this.course.courseName}\n Price: THB ${this.course.price} `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm course purchase",
            cancelButtonText: "Cancel",
          });

          if (isConfirmed) {
            this.createOrder();
          } else {
            this.dialog = true;
          }
        }
      } catch (error) {
        console.error("An error occurred:", error);
        Swal.fire({
          title: "Error",
          text: "An unexpected error occurred. Please try again later.",
          icon: "error",
          confirmButtonText: "Okay",
        });
      }
    },
    async createOrder() {
      // if (item.id == this.userNow.id && item.active == false) {
      //   console.log('checkUserActive', this.userNow.id);
      //   console.log('okokok');
      //   Swal.fire({
      //     icon: "error",
      //     title: "Oops...",
      //     text: "Your account has been disabled.",
      //   });
      //   await this.$store.dispatch("auth/logout");
      // } else { }

      const payload = {
        courseId: this.course.id,
        userId: this.userEmail.id,
      };
      await this.$store.dispatch("order/createOrder", payload);
      this.setClose();
      console.log("payload : ", payload);
      Swal.fire({
        title: "Successfully purchased the course",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    },
    autoResize(event) {
      const textarea = event.target;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User from localStorage:", user);
    if (user) {
      this.userEmail.email = user.email;
      this.userEmail.id = user.id;
      console.log("userEmail after setting:", this.userEmail);
    }
    this.$nextTick(() => {
      const textarea = document.getElementById("detail");
      if (textarea) {
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    });
  },
};
</script>

<style scoped>
.v-dialog__content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-card {
  width: 100%;
  max-width: 600px;
}

.dialog-card-title {
  display: flex;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}

.dialog-card-text {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}

.dialog-card-actions {
  display: flex;
  justify-content: center;
}
</style>
