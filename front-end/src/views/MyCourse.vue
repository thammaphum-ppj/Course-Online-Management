  <template>
    <v-container>
      <div class="head-course">
        <h1 class="mt-28">My course</h1>
      </div>
      <v-row class="mt-4 justify-start" no-gutters>
        <v-col v-for="item in incomeOrders" :key="item.id" cols="12" sm="6" md="4" lg="3" xl="2" fixed>
          <v-sheet class="ma-3 rounded-border">
            <v-card class="min-height" style="border-radius: 10px" elevation="hover" @mouseenter="isHover = true"
              @mouseleave="isHover = false">
              <v-img v-if="item.course" height="200px" :src="`${img}/${item.course.courseImage}`" cover></v-img>
              <v-card-text>
                <h1 v-if="item.course" @click="toggleShadow" :class="{ 'cursor-pointer': !isHover }">
                  {{ item.course.courseName }}
                </h1>
                <div class="box-description mt-1">
                  <p v-if="!item.course || !item.course.description || item.course.description.length === 0">
                  </p>
                  <p v-else>
                    <template v-if="!item.showFullDescription && item.course.description.length > 100">
                      {{ truncatedDescription(item.course.description) }}
                      <span @click.stop="toggleDescription(item)" class="text-primary cursor-pointer">See more</span>
                    </template>
                    <template v-else-if="item.showFullDescription">
                      {{ item.course.description }}
                      <span @click.stop="toggleDescription(item)" class="text-primary cursor-pointer">See less</span>
                    </template>
                    <template v-else>
                      {{ item.course.description }}
                    </template>
                  </p>
                </div>
                <div v-if="item.course" class="box-price text-end">
                  <h2 class="">{{ formatPrice(item.course.price) }}</h2>
                </div>
                <div class="status mt-4 size-auto w-auto">
                  <v-card v-if="item.course" class="status d-flex justify-center align-center h-6"
                    :class="{ 'incourse': item.status === 'Incourse', 'waiting': item.status === 'Waiting', 'endcourse': item.status === 'Endcourse' }">
                    {{ item.status }}
                  </v-card>
                  <v-card v-else></v-card>
                  <div v-if="item.status === 'Incourse'" class="mt-2">
                    <v-card>
                      <span>Start : {{ formatDate(item.startdate) }}</span>
                    </v-card>
                    <v-card class="mt-2">
                      <span>End : {{ formatDate(item.enddate) }}</span>
                    </v-card>
                  </div>
                  <div v-else-if="item.status === 'Waiting'" class="mt-2">
                    <v-card>
                      <span>Start : waiting</span>
                    </v-card>
                    <v-card class="mt-2">
                      <span>End : waiting</span>
                    </v-card>
                  </div>
                  <div v-else-if="item.status === 'Endcourse'" class="mt-2">
                    <!-- No cards to display -->
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>
      <!-- Canceled -->
      <div class="head-course">
        <h1 class="mt-4">Canceled</h1>
      </div>
      <v-row class="mt-4 justify-start" no-gutters>
        <v-col v-for="item in canceledOrders" :key="item.id" cols="12" sm="6" md="4" lg="3" xl="2" fixed>
          <v-sheet class="ma-3 rounded-border">
            <v-card class="min-height" style="border-radius: 10px" elevation="hover" @mouseenter="isHover = true"
              @mouseleave="isHover = false">
              <v-img v-if="item.course" height="200px" :src="`${img}/${item.course.courseImage}`" cover></v-img>
              <v-card-text>
                <h1 v-if="item.course" @click="toggleShadow" :class="{ 'cursor-pointer': !isHover }">
                  {{ item.course.courseName }}
                </h1>
                <div class="box-description mt-1">
                  <p v-if="!item.course || !item.course.description || item.course.description.length === 0">
                  </p>
                  <p v-else>
                    <template v-if="!item.showFullDescription && item.course.description.length > 100">
                      {{ truncatedDescription(item.course.description) }}
                      <span @click.stop="toggleDescription(item)" class="text-primary cursor-pointer">See more</span>
                    </template>
                    <template v-else-if="item.showFullDescription">
                      {{ item.course.description }}
                      <span @click.stop="toggleDescription(item)" class="text-primary cursor-pointer">See less</span>
                    </template>
                    <template v-else>
                      {{ item.course.description }}
                    </template>
                  </p>
                </div>
                <div v-if="item.course" class="box-price text-end">
                  <h2 class="">{{ formatPrice(item.course.price) }}</h2>
                </div>
                <div class="status mt-4 size-auto w-auto">
                  <v-card v-if="item.course" class="status d-flex justify-center align-center h-10"
                    :class="{ 'canceled': item.status === 'Canceled' }">
                    <div class="text-center">
                      {{ item.status }}
                      <br>
                      {{ formatDate(item.updatedAt) }}
                    </div>
                  </v-card>
                  <!-- <v-card v-if="item.course" class="status d-flex justify-center align-center h-10"
                    :class="{ 'canceled': item.status === 'Canceled' }">
                    <div style="margin-top: 5px;">{{ item.status }}</div>
                    {{ formatDate(item.updatedAt) }}
                  </v-card> -->

                  <v-card v-else>

                  </v-card>
                  <!-- <v-card class="mt-2">{{ formatDate(item.updatedAt) }}</v-card> -->
                </div>
              </v-card-text>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </template>

<script>
import CardOrder from "@/components/CardOrder.vue";
import { ENDPOINT } from "@/constants/endpoint";
import { mapState } from "vuex";
import QuestionPopup from "@/components/QuestionPopup.vue";
import { formatDate } from "@/constants/formatdate";
export default {
  components: {
    CardOrder,
    QuestionPopup,
  },
  data() {
    return {
      img: ENDPOINT.IMG,
      showFullDescription: false,
    };
  },
  computed: {
    ...mapState({
      order: (state) => state.order.order,
      startDate: state => state.order.startDate,
      endDate: state => state.order.endDate,
    }),
    filteredOrder() {
      return this.order.filter(item => item.course !== null);
    },
    // incomeOrders() {
    //   return this.filteredOrder.filter(item => (item.status === 'Waiting' || item.status === 'Incourse'));
    // },
    incomeOrders() {
      return this.filteredOrder
        .filter(item => item.status === 'Waiting' || item.status === 'Incourse' || item.status === 'Endcourse')
        .sort((a, b) => {
          if (a.status === 'Incourse' && b.status !== 'Incourse') return -1;
          if (a.status !== 'Incourse' && b.status === 'Incourse') return 1;
          if (a.status === 'Endcourse' && b.status !== 'Endcourse') return 1;
          if (a.status !== 'Endcourse' && b.status === 'Endcourse') return -1;
          return 0;
        });
    },
    canceledOrders() {
      return this.filteredOrder.filter(item => item.status === 'Canceled');
    },
  },
  async mounted() {
    await this.getOrder();
  },
  methods: {
    // formatDate(date) {
    //   return new Date(date).toLocaleDateString('en-EN', {
    //     day: 'numeric',
    //     month: 'long',
    //     year: 'numeric'
    //   });
    // },
    formatDate,
    async getOrder() {
      const userDataString = localStorage.getItem("user");

      if (userDataString) {
        const userData = JSON.parse(userDataString);

        const id = userData.id;

        if (id) {
          console.log("User ID:", id);
          const payload = {
            userId: userData.id,
          };
          await this.$store.dispatch("order/getOrder", payload);
          console.log("Order:", this.order);
        } else {
          console.log("User ID not found in userData");
        }
      } else {
        console.log("User data not found in Local Storage");
      }
    },
    toggleDescription(item) {
      item.showFullDescription = !item.showFullDescription;
      if (item.showFullDescription) {
        this.$router.push(`/detailcourse/${item.course.id}`);
      }
    },
    truncatedDescription(description) {
      return description.length > 100
        ? description.slice(0, 100) + "..."
        : description;
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

.v-card-text h1 {
  font-weight: bold;
  font-size: 20px;
}

.v-card-text h1:hover {
  color: #075985;
}

.min-height {
  min-height: 480px;
}

.box-description {
  min-height: 100px;
}

.box-price {
  font-size: 24px;
  color: #fc5d19;
  font-weight: bold;
}

.incourse {
  background-color: #098ad0;
  color: rgb(255, 255, 255);
}

.waiting {
  background-color: #374248;
  color: rgb(255, 255, 255);
}

.canceled {
  background-color: rgb(253, 69, 69);
  color: rgb(255, 255, 255);
}

.endcourse {
  background-color: #9093a3;
  color: rgb(255, 255, 255);
}

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
</style>
