<template>
  <div>
    <v-card
      :class="{ 'fixed-height': !showFullDescription }"
      style="
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
      "
      elevation="hover"
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
      @click="goToDetailPage(course)"
    >
      <div>
        <v-img height="200px" :src="`${img}/${course.courseImage}`" cover>
        </v-img>

        <v-card-text class="mb-0" style="flex-grow: 1;">
          <h1 @click="toggleShadow" :class="{ 'cursor-pointer': !isHover }">
            {{ course.courseName }}
          </h1>
          <div class="description-course mt-1">
            <p v-if="!showFullDescription">
              {{ truncatedDescription }}
              <span
                v-if="course.description.length >= 100"
                @click.stop="toggleDescription"
                class="text-primary cursor-pointer"
                >See more</span
              >
            </p>
            <p v-else>
              {{ course.description }}
              <span
                @click.stop="toggleDescription"
                class="text-primary cursor-pointer"
                >See less</span
              >
            </p>
          </div>
        </v-card-text>
      </div>
      <div class="price-container text-end">
        <h2 class="pb-20 mt-0">{{ formatPrice(course.price) }} </h2>
      </div>
      <v-card-btn class="card-buttons">
        <v-btn
          value="favorites"
          class="rounded-circle"
          @click.stop="toggleFavorite(course)"
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
              fill="none"
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
        <v-btn
          class="btn-buy text-white font-weight-regular"
          style="
            height: 40px;
            display: flex;
            align-items: center;
            margin-right: 0px;
          "
          text="BUY"
          variant="tonal"
          @click.stop="handleBuyClick(course)"
        ></v-btn>
      </v-card-btn>
    </v-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { ENDPOINT } from "@/constants/endpoint";
import _ from "lodash";
import { mapState } from "vuex";

export default {
  name: "CardCourse",
  data() {
    return {
      isHover: false,
      isFavorite: false,
      showFullDescription: false,
      img: ENDPOINT.IMG,
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  computed: {
    truncatedDescription() {
      return this.course.description.length > 100
        ? this.course.description.slice(0, 100) + "..."
        : this.course.description;
    },
  },
  props: {
    course: Object,
    setOpenModal: Function,
  },
  watch: {
    course(newVal) {
      console.log("card course", newVal);
      return newVal;
    },
  },
  mounted() {},
  methods: {
    goToDetailPage() {
      this.$router.push(`/guestdetailcourse/${this.course.id}`);
    },
    toggleShadow() {
      this.isHover = !this.isHover;
    },
    async toggleFavorite(course) {
      if (!this.user) {
        Swal.fire({
          icon: "warning",
          title: "You are not logged in yet",
          text: "You must login first",
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
        return;
      }
      this.isFavorite = !this.isFavorite;
      const payload = {
        userId: this.user.id,
        courseId: course.id,
      };

      try {
        if (this.isFavorite) {
          await this.$store.dispatch("favorite/updateFavorite", payload);
        } else {
          await this.$store.dispatch("favorite/deleteFavorite", payload);
        }
      } catch (error) {
        console.error("Error updating favorite status:", error);
        this.isFavorite = !this.isFavorite; // Revert the favorite state if there's an error
      }
    },
    handleBuyClick(course) {
      if (!this.user) {
        Swal.fire({
          icon: "warning",
          title: "You are not logged in yet",
          text: "You must login first",
          showConfirmButton: true,
          confirmButtonText: "OK",
        });
        return;
      }
      this.setOpenModal(course);
    },
    toggleDescription() {
      this.showFullDescription = !this.showFullDescription;
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
.v-card {
  transition: box-shadow 0.3s ease;
}
.v-card:hover {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}
.v-card.fixed-height {
  height: 450px;
}
.v-card-text h1 {
  font-weight: bold;
  font-size: 20px;
}
.v-card-text h1:hover {
  color: #075985;
}
.btn-buy {
  color: #fff;
  background-color: #098ad0;
  border-color: #0982c4;
  width: 120px;
}

.text-end h2 {
  font-size: 24px;
  color: #fc5d19;
  font-weight: bold;
}
.description-course {
  color: grey;
}
.cursor-pointer {
  cursor: pointer;
}
.v-btn {
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
}
.text-primary {
  color: #098ad0;
}
.text-primary2 {
  color: #00527e;
}
.card-buttons {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.price-container {
  margin-top: auto;
  padding: 0 16px;
  top: 100px;
}
</style>