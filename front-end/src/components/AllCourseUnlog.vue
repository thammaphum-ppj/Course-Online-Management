<template lang="">
  <div>
    <ConfirmCourse
      :openModal="openModal"
      :course="itemCourse"
      :setCloseModal="setCloseModal"
    />
    <div>
      <!-- Recommended Courses Section -->
      <v-container class="head-course">
        <h1 class="mt-14">Recommended course</h1>
      </v-container>
      <v-container>
        <v-row class="justify-start" no-gutters>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            xl="2"
            v-for="course in recommendedCourses"
            :key="course.id"
            fixed
          >
            <v-sheet class="ma-3 rounded-border">
              <CardCourseUnlog :course="course" :setOpenModal="setOpenModal" />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>

      <!-- New Courses Section -->
      <v-container class="head-course">
        <h1 class="mt-14">New course</h1>
      </v-container>
      <v-container>
        <v-row class="justify-start" no-gutters>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            xl="2"
            v-for="course in newCourses"
            :key="course.id"
            fixed
          >
            <v-sheet class="ma-3 rounded-border">
              <CardCourseUnlog :course="course" :setOpenModal="setOpenModal" />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>

      <!-- All Courses Section by Category -->
      <v-container class="head-course">
        <h1>All course</h1>
      </v-container>
      <v-container>
        <div v-for="category in category" :key="category.id">
          <div v-if="category?.courses && category.courses.length > 0">
            <v-container class="head">
              <h1>{{ category.name }}</h1>
            </v-container>
            <v-row class="justify-start" no-gutters>
              <v-col
                cols="12"
                sm="6"
                md="4"
                lg="3"
                xl="2"
                v-for="course in category?.courses"
                :key="course.id"
                fixed
              >
                <div class="ma-3 rounded-border">
                  <CardCourseUnlog :course="course" :setOpenModal="setOpenModal" />
                </div>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-container>

      <!-- All Courses Section -->
      <v-container class="head-all">
        <h1>All course</h1>
      </v-container>
      <v-container>
        <v-row class="justify-start" no-gutters>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            xl="2"
            v-for="course in course"
            :key="course.id"
            fixed
          >
            <v-sheet class="ma-3 rounded-border">
              <CardCourseUnlog :course="course" :setOpenModal="setOpenModal" />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>

      <QuestionPopup />
    </div>
  </div>
</template>

<script>
import Navbar from '@/layout/Navbar.vue';
import Swal from 'sweetalert2';
// import CardCourse from "@/components/CardCourse.vue";
import CardCourseUnlog from "@/components/CardCourseUnlog.vue";
import { mapState } from "vuex";
import ConfirmCourse from "@/views/ConfirmCourse.vue";
import Question from "./Question.vue";
import { StatusCourse } from "@/constants/enum"; 
// import { TYPE_COURSE } from "@/constants/type-course";
export default {
  components: {
    ConfirmCourse,
    Question,
    CardCourseUnlog,
    Navbar
  },
  data() {
    return {
      openModal: false,
      itemCourse: {},

      // data: [1, 2, 3],
      // course: [1, 2, 3, 4, 5],
    };
  },
  methods: {
    setOpenModal(item) {
      
      this.itemCourse = item;
      this.openModal = true;
    },

    setCloseModal() {
      this.openModal = false;
    },
  },
  computed: {
    ...mapState({
      course: (state) => state.course.course,
      category: (state) => state.category.names,
    }),
    recommendedCourses() {
      return this.course.filter((c) => c.status === StatusCourse.Recommended);
    },
    newCourses() {
      return this.course.filter((c) => c.status === StatusCourse.New);
    },
  },
  watch: {
    course(newVal) {
      return newVal
    },
    category(newVal) {
      return newVal
    }
  },
  async mounted() {
    await this.$store.dispatch("course/getCourse");
    await this.$store.dispatch("category/getCategory");
    console.log("categorycategorycategory", this.category);

    console.log("coursecoursecourse", this.course);
  },
};
</script>

<style>
.head-course h1 {
  font-size: 35px;
  color: rgb(0, 0, 0);
  border-bottom: 1px solid #000000;
  font-style: italic;
}
.head h1 {
  font-size: 20px;
  color: rgb(6, 6, 6);
  border-bottom: 1px solid #9e9e9e;
  font-style: italic;
}
.head-all h1 {
  font-size: 25px;
  color: rgb(6, 6, 6);
  border-bottom: 1px solid #9e9e9e;
  font-style: italic;
}
.head-category h1 {
  font-size: 25px;
  color: rgb(6, 6, 6);
  border-bottom: 1px solid #9e9e9e;
  font-style: italic;
}
.rounded-border {
  border-radius: 20px;
}
.buy-button {
  background-color: #098ad0;
  color: #fff;
}
.buy-button:hover {
  background-color: #045190;
}
</style>