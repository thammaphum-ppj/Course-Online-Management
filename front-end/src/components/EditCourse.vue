<template>
  <div class="container mx-auto px-96 mt-8">
    <h1 class="text-3xl font-bold mb-10 text-left">Edit Course</h1>
    <div class="mb-4 flex items-center">
      <label for="courseName" class="block w-1/4 mr-4"
        >Name:
        <span class="text-red-500" v-if="!course.courseName.trim()">*</span>
      </label>
      <input
        type="text"
        id="courseName"
        v-model="course.courseName"
        class="w-3/4 p-2 border border-gray-300 rounded"
      />
    </div>
    <div class="mb-4 flex items-center">
      <label for="price" class="block w-1/4 mr-4">Price:</label>
      <input
        type="text"
        id="price"
        v-model="course.price"
        @input="validatePrice"
        class="w-3/4 p-2 border border-gray-300 rounded"
      />
    </div>
    <div class="mb-4 flex items-center">
      <label for="description" class="block w-1/4 mr-4"
        >Detail:
        <span class="text-red-500" v-if="!course.description.trim()">*</span>
      </label>
      <textarea
        id="description"
        v-model="course.description"
        class="w-3/4 p-2 border border-gray-300 rounded"
        style="max-height: 150px; overflow-y: auto; resize: none"
      ></textarea>
    </div>

    <div class="mb-4 flex items-center">
      <label for="status" class="block w-1/4 mr-4">Status:</label>
      <select
        id="status"
        v-model="course.status"
        class="w-3/4 p-2 border border-gray-300 rounded"
      >
        <option value="" disabled>Select status</option>
        <option value="New">New</option>
        <option value="Recommended">Recommended</option>
        <option value="off">Off</option>
      </select>
    </div>
    <div class="mb-4 flex items-center">
      <label for="categoryId" class="block w-1/4 mr-4">Category:</label>
      <select
        id="categoryId"
        v-model="category"
        class="w-3/4 p-2 border border-gray-300 rounded"
        @change="categoryChangeHandler"
      >
        <option value="" disabled>Select category</option>
        <option
          v-for="option in categories"
          :key="option.id"
          :value="option.id"
        >
          {{ option.name }}
        </option>
      </select>
    </div>

    <div class="mb-4 flex items-center">
      <div class="w-1/4 mr-4">
        <label class="block">Upload image :</label>
      </div>
      <div class="flex items-center ml-13">
        <div
          id="image-preview-1"
          class="max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer mr-4 overflow-scroll-y"
        >
          <!-- <input
  id="upload-1"
  type="file"
  class="hidden"
  accept=".jpg,.png,.gif"
  multiple
  @change="updateImage($event, i)"
/> -->
          <input
            id="upload-1"
            type="file"
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
          <div v-for="(item, i) in course.images" :key="i">
            <span class="text-gray-500 bg-gray-200 z-50">{{
              item.name || item.item.name
            }}</span>
            <img
              :src="`${path}${item.name}`"
              style="max-width: 100%; height: auto"
            />
            <div v-if="item.result">
              <img
                :src="`${item.result}`"
                style="max-width: 100%; height: auto"
              />
            </div>
            <button
              @click="removeImage(i)"
              class="absolute top-auto -right bg-red-500 text-white p-1 rounded-full"
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center py-5 mb-8">
      <button
        @click="confirmSave"
        class="bg-sky-700 text-white px-9 py-2 rounded hover:shadow-xl hover:bg-sky-800"
      >
        Save
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
import { ENDPOINT } from "@/constants/endpoint";
import category from "@/store/modules/category";
import Swal from "sweetalert2";
import { mapState } from "vuex";

export default {
  data() {
    return {
      course: {
        courseName: "",
        price: "",
        description: "",
        status: "",
        categorys: null,
        images: [],
        path: null,
      },
      category: null,
    };
  },

  computed: {
    ...mapState({
      categories: (state) => state.category.names,
      courseFromStore: (state) => state.course.selectedCourse,
    }),
  },
  watch: {
    courseName(newVal) {
      return newVal;
    },
  },

  async mounted() {
    const courseId = this.$route.params.id;
    console.log("ไหนค่า", ENDPOINT.IMAGE);
    this.path = ENDPOINT.IMAGE;
    await this.$store.dispatch("course/getCourseById", courseId);
    const courseData = this.courseFromStore;
    if (courseData) {
      this.course = { ...courseData };
    }
    console.log("this.course", this.course);
    this.category = this.course.categorys.id;
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
    handleFileUpload(event) {
      for (const item of event.target.files) {
        if (item && item.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.course.images.push({ item, result: e.target.result });
            console.log("XC", item);
            console.log("IMG", this.course.images);
            this.imageUrl = e.target.result;
          };
          reader.readAsDataURL(item);
        } else {
          this.imageUrl = null;
        }
      }
    },
    async confirmSave() {
      if (
        !this.course.courseName.trim() ||
        !this.course.price ||
        !this.course.description.trim()
      ) {
        Swal.fire({
          title: "Invalid Input",
          text: "fields must not be empty",
          icon: "error",
        });
        return;
      }
      if (isNaN(this.course.price)) {
        Swal.fire({
          title: "Invalid Price",
          text: "Price must be a number",
          icon: "error",
        });
        return;
      }
      const confirmResult = await Swal.fire({
        title: "Are you sure to save changes??",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (confirmResult.isConfirmed) {
        const courseId = this.$route.params.id;
        const payload = {
          id: courseId,
          courseName: this.course?.courseName,
          price: this.course?.price,
          description: this.course?.description,
          status: this.course?.status,
          categoryId: this.course?.categorys.id,
          files: this.course?.images,
        };
        Swal.fire({
          title: "Edit course successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
        this.$router.push({ name: "coursemanage" });

        await this.$store.dispatch("course/updateCourse", payload);
        // console.log("image", this.course.images);
      }
    },
    updateImage(event, index) {
      const newImage = event.target.files[0];
      this.course.images.splice(index, 1, newImage);
    },
    removeImage(index) {
      this.course.images.splice(index, 1);
    },
    updateImage(event, index) {
      const newImage = event.target.files[0];
      this.course.images.splice(index, 1, newImage);
    },
    removeImage(index) {
      this.course.images.splice(index, 1);
    },
    cancel() {
      this.$router.push({ name: "coursemanage" });
    },
  },
};
</script>
