<template>
  <v-container class="head-course">
    <h1 class="mt-28">Interested Course</h1>
    <v-row class="justify-start" no-gutters>
      <transition-group name="fade" mode="out-in">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xl="2"
          v-for="i in favorite"
          :key="i.id"
          fixed
        >
          <v-sheet class="ma-3 rounded-border">
            <CardCourse :course="i" :setOpenModal="setOpenModal" />
          </v-sheet>
        </v-col>
      </transition-group>
    </v-row>
    <ConfirmCourse :openModal="openModal" :course="itemCourse" :setCloseModal="setCloseModal" />
    <QuestionPopup />
  </v-container>
</template>

<script>
import CardCourse from "@/components/CardCourse.vue";
import favorite from "@/store/modules/favorite";
import ConfirmCourse from "@/views/ConfirmCourse.vue";
import QuestionPopup from "@/components/QuestionPopup.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      openModal: false,
      itemCourse: {},
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  components: {
    CardCourse,
    ConfirmCourse,
    QuestionPopup
  },
  computed: {
    ...mapState({
      favorite: (state) => state.favorite.favorite,
    }),
  },
  async mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const payload = {
        userId: this.user.id,
      };
      await this.$store.dispatch("favorite/getFavorite", payload);
    },
    setOpenModal(item) {
      this.itemCourse = item;
      this.openModal = true;
    },
    setCloseModal() {
      this.openModal = false;
    },
  },
};
</script>

<style scoped>
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-leave-to {
  opacity: 0;
}
.head-course h1 {
  font-size: 30px;
  color: black;
  border-bottom: 1px solid #9e9e9e;
  font-style: italic;
}
.rounded-border {
  border-radius: 20px;
}
</style>
