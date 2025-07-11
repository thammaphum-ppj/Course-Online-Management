<template>
  <div class="w-full">
    <v-row>
      <v-col cols="12">
        <v-carousel show-arrows interval="3000" cycle hide-delimiter-background>
          <template v-slot:prev="{ props }">
            <v-btn color="" variant="elevated" @click="props.onClick">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
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
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                  clip-rule="evenodd"
                />
              </svg>
            </v-btn>
          </template>
          <v-carousel-item
            v-for="(item, index) in images"
            :key="index"
            :src="item.src"
            cover
            @click="showSingleImage(index)"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-btn
        icon
        dark
        @click="dialog = false"
        class="absolute top-0 -right-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6"
        >
          <path
            fill-rule="evenodd"
            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
      </v-btn>

      <img
        :src="selectedImage"
        alt="Selected Image"
        class="w-full cursor-pointer"
        @click="nextSlide"
      />
    </v-dialog>
  </div>
</template>

<script>
import { mdiAccount } from "@mdi/js";

export default {
  data() {
    return {
      path: mdiAccount,
      images: [
        { src: "../../public/img/Course_01.jpg" },
        { src: "../../public/img/Course_02.png" },
        { src: "../../public/img/Course_03.jpg" },
      ],
      dialog: false,
      selectedImage: "",
      currentIndex: 0,
    };
  },
  methods: {
    showSingleImage(index) {
      this.selectedImage = this.images[index].src;
      this.dialog = true;
    },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      } else {
        this.currentIndex = this.images.length - 1;
      }
    },
    nextSlide() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
      }
    },
    closeDialogOnEscape() {
      this.dialog = false;
    },
  },
  mounted() {
    window.addEventListener("keydown", this.closeDialogOnEscape);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.closeDialogOnEscape);
  },
};
</script>

<style scoped>
.v-carousel {
  max-width: 100%;
  max-height: 90%;
}
</style>
