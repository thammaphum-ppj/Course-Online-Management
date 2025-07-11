<template>
  <div class="container mx-auto px-96 mt-8">
    <h1 class="text-3xl font-bold mb-10 text-left">Add Course</h1>

    <div class="mb-4 flex items-center">
      <label for="name" class="block w-1/4 mr-4"
        >Name:<span class="text-red-500" v-if="!course.name.trim()"
          >*</span
        ></label
      >
      <input
        type="text"
        id="name"
        v-model="course.name"
        class="w-3/4 p-2 border border-gray-300 rounded"
      />
    </div>
    <div class="mb-4 flex items-center">
      <label for="price" class="block w-1/4 mr-4"
        >Price:<span class="text-red-500" v-if="!course.price">*</span></label
      >
      <input
        type="text"
        id="price"
        v-model="course.price"
        @input="validatePrice"
        class="w-3/4 p-2 border border-gray-300 rounded"
      />
    </div>
    <div class="mb-4 flex items-center">
      <label for="detail" class="block w-1/4 mr-4">
        Detail:<span class="text-red-500" v-if="!course.detail.trim()">*</span>
      </label>
      <textarea
        class="w-3/4 p-2 border border-gray-300 rounded"
        id="detail"
        v-model="course.detail"
        style="max-height: 150px; overflow-y: auto; resize: none"
      ></textarea>
    </div>

    <div class="mb-4 flex items-center">
      <label for="status" class="block w-1/4 mr-4"
        >Status:<span class="text-red-500" v-if="!course.status">*</span></label
      >
      <select
        id="status"
        v-model="course.status"
        class="w-3/4 p-2 border border-gray-300 rounded"
      >
        <option value="" disabled selected>Select status</option>
        <option value="New">New</option>
      </select>
    </div>
    <div class="mb-4 flex items-center">
      <label for="category" class="block w-1/4 mr-4"
        >Category:<span class="text-red-500" v-if="!course.category"
          >*</span
        ></label
      >
      <select
        id="category"
        v-model="course.category"
        class="w-3/4 p-2 border border-gray-300 rounded"
        @change="categoryChangeHandler"
      >
        <option value="" disabled>Select category</option>
        <option v-for="option in category" :value="option.id" :key="option.id">
          {{ option.name }}
        </option>
      </select>
    </div>

    <div class="mb-2 flex items-center">
      <div class="w-1/4 mr-4">
        <label class="block"
          >Upload image :<span class="text-red-500" v-if="!course.images.length"
            >*</span
          ></label
        >
      </div>
      <div class="flex items-center ml-13">
        <div
          id="image-preview-1"
          class="max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer mr-4 overflow-scroll-y"
        >
          <input
            id="upload-1"
            type="file"
            class="hidden"
            accept=".jpg,.png,.gif"
            multiple
            @change="handleFileUpload"
          />
          <label
            v-if="course.images.length == 0"
            for="upload-1"
            class="cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8 text-gray-700 mx-auto mb-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-700">
              Upload picture
            </h5>
            <p class="font-normal text-sm text-gray-400 md:px-6">
              Choose photo size should be less than
              <b class="text-gray-600">2mb</b>
            </p>
            <p class="font-normal text-sm text-gray-400 md:px-6">
              and should be in
              <b class="text-gray-600">JPG, PNG, or GIF</b> format.
            </p>
          </label>
          <div v-for="(item, i) in course.images" :key="i" class="relative">
            <span class="text-gray-500 bg-gray-200 z-50">{{
              item.file.name
            }}</span>
            <img
              :src="item.result"
              :alt="'Image Preview ' + (i + 1)"
              style="max-width: 100%; height: auto"
            />
            <button
              @click="removeImage(i)"
              class="absolute -top-2 right-0 bg-black text-white p-1 rounded-full"
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center py-5 mb-8">
      <button
        @click="submitCourse"
        class="bg-sky-700 text-white px-9 py-2 rounded hover:shadow-xl hover:bg-sky-800"
      >
        Submit
      </button>
      <div class="w-4"></div>
      <button
        @click="cancel"
        class="bg-gray-500 text-white px-9 py-2 rounded hover:shadow-xl hover:bg-gray-500"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      course: {
        name: "",
        price: "",
        detail: "",
        status: "",
        category: "",
        images: [],
      },
      imageUrl: null,
    };
  },

  computed: {
    ...mapState({
      category: (state) => state.category.names,
    }),
  },

  async mounted() {
    await this.$store.dispatch("category/getCategory");
  },

  methods: {
    categoryChangeHandler() {
      if (this.course.category === "Add New Category") {
        this.showNewCategoryInput = true;
      } else {
        this.showNewCategoryInput = false;
      }
    },
    handleFileUpload(event) {
      for (const item of event.target.files) {
        if (item && item.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.course.images.push({ file: item, result: e.target.result });
            console.log("XC", item);
            this.imageUrl = e.target.result;
          };
          reader.readAsDataURL(item);
        } else {
          this.imageUrl = null;
        }
        // console.log("OP", this.imageUrl);
        // console.log("AAAAAA", this.course.images);
      }
    },
    removeImage(index) {
      this.course.images.splice(index, 1);
    },
    validatePrice(event) {
      const inputValue = event.target.value;
      if (!/^\d*\.?\d*$/.test(inputValue)) {
        Swal.fire({
          icon: "error",
          title: "Incorrect information",
          text: "Numbers only",
        });
        this.course.price = "";
      }
    },
    validateNoSpace(field) {
      if (this.course[field].includes(" ")) {
        Swal.fire({
          icon: "error",
          title: "No space for channels!",
          text: `The ${field} field cannot contain spaces.`,
        });
        this.course[field] = this.course[field].replace(/\s/g, "");
      }
    },
    async submitCourse() {
      if (
        !this.course.name.trim() ||
        !this.course.price ||
        !this.course.detail.trim() ||
        !this.course.status ||
        !this.course.category ||
        this.course.images.length === 0
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops... Invalid Input",
          text: "fields must not be empty",
        });
        return;
      }

      try {
        await this.$store.dispatch("course/addCourse", this.course);
        Swal.fire({
          icon: "success",
          title: "Successfully added course",
          showConfirmButton: false,
          timer: 2000,
        });
       this.$router.push({ name: "coursemanage" });
      } catch (error) {
        console.log("X10",this.course);
        console.error("Failed to add course", error);
        console.log("Error response: ", error.response);

        if (error.message === "This name is already in use") {
          Swal.fire({
            icon: "warning",
            title: "This course name is already in use",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to add course!",
          });
        }
      }
    },
    cancel() {
      this.course = {
        name: "",
        price: "",
        detail: "",
        status: "",
        category: "",
        images: [],
      };
      this.$router.push({ name: "coursemanage" });
    },
  },
};
</script>
