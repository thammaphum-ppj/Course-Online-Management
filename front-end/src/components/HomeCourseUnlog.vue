<template>
  <div>
    <ConfirmCourse
      :openModal="openModal"
      :course="itemCourse"
      :setCloseModal="setCloseModal"
    />
    <div>
      <!-- Recommended Courses Section -->
      <v-container class="head-course">
        <h1 class="mt-10">Recommended course</h1>
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
        <h1 class="mt-10">New course</h1>
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
    </div>
    <Quesstion/>
  </div>
  
</template>

<script>
import { mapState } from "vuex";
import ConfirmCourse from "@/views/ConfirmCourse.vue";
import CardCourseUnlog from "./CardCourseUnlog.vue";
import Question from "./Question.vue";
import { StatusCourse } from "@/constants/enum";

export default {
  components: {
    CardCourseUnlog,
    ConfirmCourse,
    Question
  },
  data() {
    return {
      openModal: false,
      itemCourse: {},
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
      const recommended = this.course.filter((c) => c.status === StatusCourse.Recommended);
      console.log('Recommended Courses:', recommended);  // Debug log
      return recommended;
    },
    newCourses() {
      const newCourses = this.course.filter((c) => c.status === StatusCourse.New);
      console.log('New Courses:', newCourses);  // Debug log
      return newCourses;
    },
  },
  watch: {
    course(newVal) {
      console.log('Updated Course:', newVal);
    },
    category(newVal) {
      console.log('Updated Category:', newVal);
    }
  },
  async mounted() {
    try {
      await this.$store.dispatch("course/getCourse");
      await this.$store.dispatch("category/getCategory");
      console.log("Categories:", this.category);
      console.log("Courses:", this.course);
    } catch (error) {
      console.error("Error fetching data in mounted:", error);
    }
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
.rounded-border {
  border-radius: 20px;
}
</style>
