<template>
  <v-container class="head-course">
    <h1 class="mt-20">Detail Course</h1>
  </v-container>
  <ConfirmCourse
    :openModal="openModal"
    :course="itemCourse"
    :setCloseModal="setCloseModal"
  />

  <div
    class="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-x-10 py-8"
  >
    <div class="ml-56">
      <v-carousel
        hide-delimiters
        class="custom-carousel shadow-lg"
        v-if="coursebyid?.images"
      >
        <v-carousel-item v-for="(item, i) in coursebyid?.images" :key="i" cover>
          <div
            @click="moveImageWrapperLeft(i)"
            class="image-wrapper flex justify-center overflow-hidden border-2 border-gray-300 rounded-lg"
          >
            <img
              :src="`${img}/${item.name}`"
              :alt="`Image ${i + 1}`"
              class="w-full h-full object-contain"
            />
          </div>
        </v-carousel-item>
        <template v-slot:prev="{ props }">
          <v-btn color="" variant="elevated" @click="props.onClick">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-4 h-4"
            >
              <path
                fill-rule="evenodd"
                d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </v-btn>
        </template>
        <template v-slot:next="{ props }">
          <v-btn color="" variant="elevated" @click="props.onClick">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-4 h-4"
            >
              <path
                fill-rule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </v-btn>
        </template>
      </v-carousel>
    </div>

    <div
      v-if="coursebyid"
      class="box-border rounded-lg bg-sky-100 shadow-lg ml-48"
    >
      <h1 class="text-2xl mx-4 mt-10">
        <strong style="overflow: hidden; word-wrap: break-word">
          <b
            class="text-sm text-sky-500"
            style="display: block; margin-bottom: 0.5rem"
            >Online Course</b
          >
          {{ coursebyid.courseName }}
        </strong>
      </h1>

      <h2
        v-if="coursebyid"
        class="text-4xl font-bold text-orange-500 mt-10 ml-5 break-words"
      >
        {{ formatPrice(coursebyid.price) }}
      </h2>

      <div class="mt-15 border-t-2 border-gray-300">
        <div class="flex justify-center">
          <div class="h-14 w-64 mt-11 rounded-lg bg-sky-900 hover:bg-sky-600">
            <p
              @click="setOpenModal(coursebyid)"
              class="text-white font-bold font-sans text-center text-2xl py-3 hover:text-cyan-900"
            >
              Buy
            </p>
          </div>
        </div>
        <div class="flex justify-center">
          <div
            class="h-14 w-64 mt-4 rounded-lg bg-sky-400 flex items-center justify-between px-4"
          >
            <v-btn
              value="favorites"
              class="rounded-circle"
              @click="toggleFavorite(coursebyid)"
              style="
                width: 40px;
                height: 40px;
                min-width: 40px;
                min-height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: white;
                border-radius: 50%;
                padding: 0;
                margin: 0;
              "
            >
              <template v-if="!isFavorite">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-6 h-6"
                >
                  <path
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </template>
              <template v-else>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#fc0345"
                  class="w-6 h-6"
                >
                  <path
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </template>
            </v-btn>
            <p
              class="text-sky-900 font-bold font-sans text-center text-2xl flex-grow mr-5"
            >
              Favorites
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="coursebyid"
      class="box-border-detail ml-56 mt-10"
    >
      <div class="p-6 bg-white rounded-lg shadow-md">
        <h1 class="text-lg font-bold">Course details</h1>
        <p class="text-base mt-2 indent-10 text-wrap break-words">
          {{ coursebyid.description }}
        </p>
      </div>
    </div>

    <div
      class="box-border-teacher p-8 bg-sky-100 rounded-lg shadow-lg hover:shadow-xl ml-48 mt-10"
    >
      <div class="flex justify-center">
        <div
          class="w-36 h-36 rounded-full overflow-hidden shadow-xl border-4 transition hover:scale-110 duration-300"
        >
          <img
            :src="`${img}/${teacher.userImage}`"
            alt="Teacher's Image"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
      <div class="mt-4">
        <h2
          class="text-center text-xl text-sky-700 font-semibold hover:text-sky-500"
        >
          {{ teacher.fname }} {{ teacher.lname }}
        </h2>
        <div class="text-x text-gray-700 mt-2">
          <p>
            <b> Email: </b>
            <span class="font-medium hover:text-gray-400">{{
              teacher.email
            }}</span>
          </p>
          <p>
            <b> Phone: </b>
            <span class="font-medium hover:text-gray-400">{{
              teacher.phone
            }}</span>
          </p>
        </div>
        <p
          class="text-sm text-gray-600 mt-2 hover:text-gray-400 text-wrap break-words"
        >
          <b> Information: </b> {{ teacher.desc }}
        </p>
      </div>
    </div>
  </div>

</template>
<script>
import _ from "lodash";
import ConfirmCourse from "@/views/ConfirmCourse.vue";
import { mapState } from "vuex";
import { ENDPOINT } from "@/constants/endpoint";

export default {
  data() {
    return {
      isFavorite: false,
      openModal: false,
      img: ENDPOINT.IMG,
      itemCourse: {},
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  components: {
    ConfirmCourse,
  },
  computed: {
    ...mapState({
      favorite: (state) => state.favorite.favorite,
      teacher: (state) => state.user.user,
      coursebyid: (state) => state.course.selectedCourse,
    }),
  },
  watch: {
    coursebyid(newVal) {
      console.log("card course", newVal);
      return newVal;
    },
    isFavorite(newVal) {
      return newVal;
    },
  },
  async mounted() {
    this.scrollToTop();
    this.getTeacher();
    await this.getCourse();
    this.checkFavorite(this.coursebyid, this.user);
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    setOpenModal(item) {
      this.itemCourse = item;
      this.openModal = true;
    },

    setCloseModal() {
      this.openModal = false;
    },
    async getTeacher() {
      await this.$store.dispatch("user/getTeacher");
      console.log("teacher", this.teacher);
    },
    async getCourse() {
      await this.$store.dispatch("course/getCourseById", this.$route.params.id);
      console.log("coursebyid", this.coursebyid);
      this.coursebyid.images.unshift({
        name: this.coursebyid.courseImage,
      });
    },
    checkFavorite(course, user) {
      _.map(course?.favoriteByUsers, (fav) => {
        if (fav?.id == user.id) {
          this.isFavorite = true;
        }
      });
    },
    async toggleFavorite(course) {
      this.isFavorite = !this.isFavorite;
      const payload = {
        userId: this.user.id,
        courseId: course.id,
      };
      console.log("toggleFavorite", course);

      if (course?.favoriteByUsers && course.favoriteByUsers.length != 0) {
        _.map(course?.favoriteByUsers, async (fav) => {
          if (fav?.id == this.user.id) {
            console.log("favorite/deleteFavorite");
            await this.$store.dispatch("favorite/deleteFavorite", payload);
          } else {
            console.log("favorite/updateFavorite1");
            await this.$store.dispatch("favorite/updateFavorite", payload);
          }
        });
      } else {
        console.log("favorite/updateFavorite2");
        await this.$store.dispatch("favorite/updateFavorite", payload);
      }
    },
    formatPrice(price) {
      return price
        .toLocaleString("en-US", { style: "currency", currency: "THB" })
        .replace("THB", "฿");
    },
  },
};
</script>


<style scoped>
.head-course h1 {
  font-size: 30px;
  color: black;
  border-bottom: 1px solid #9e9e9e;
  font-style: italic;
}

.rounded-border {
  border-radius: 20px;
}
.box-border {
  width: 300px;
  height: 500px;
}

.box-border-detail {
  height: 459px;
  width: 740px;
}

.box-border-teacher {
  max-width: 300px;
  min-height: 300px;
}

.custom-carousel {
  height: 500px;
  width: 740px;
}

.image-wrapper {
  height: 500px;
  width: 740px;
}
</style>
