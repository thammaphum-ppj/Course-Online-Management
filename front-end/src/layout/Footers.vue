<template>
  <v-card color="#4A6FA5" style="height: 55px">
    <div class="flex items-center justify-center py-4">
      <!-- facbook -->
      <a :href="teacher.linkFacebook" class="px-3">
        <svg
          fill="#f8fafc"
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z"
          />
        </svg>
      </a>
      <!-- email -->
      <a :href="'mailto:'+teacher.linkEmail" class="px-3">
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <path
            fill="#f8fafc"
            d="M14.9 8.161c0-.476-.039-.954-.121-1.422h-6.64v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.269c1.332-1.22 2.097-3.02 2.097-5.15z"
          />
          <path
            fill="#f8fafc"
            d="M8.14 15c1.898 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.836 0-3.393-1.232-3.952-2.888H1.85v1.803A7.044 7.044 0 008.14 15z"
          />
          <path
            fill="#f8fafc"
            
            d="M4.187 9.342a4.17 4.17 0 010-2.68V4.859H1.849a6.97 6.97 0 000 6.286l2.338-1.803z"
          />
          <path
            fill="#f8fafc"
            d="M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.29 3.858L4.186 6.66c.556-1.658 2.116-2.89 3.952-2.89z"
          />
        </svg>
      </a>
      <a :href="teacher.linkLine" class="px-1">
        <svg
          fill="#f8fafc"
          width="25px"
          height="25px"
          viewBox="-5.5 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>line</title>
          <path
            d="M10.656 5.938c5.938 0 10.719 3.875 10.719 8.688 0 2.344-1.156 4.406-2.969 6.031-2.938 2.906-8 5.844-8.531 5.625-0.875-0.344 0.656-2.219 0.031-3.031-0.094-0.125-0.438-0.094-1.063-0.188-5.156-0.688-8.844-4.094-8.844-8.469 0-4.813 4.75-8.656 10.656-8.656zM4.563 17.5h1.813c0.313 0 0.5-0.25 0.5-0.563 0-0.219-0.156-0.5-0.563-0.5h-1.469c-0.125 0-0.125-0.125-0.125-0.563v-3.156c0-0.281-0.188-0.563-0.531-0.563-0.313 0-0.531 0.25-0.531 0.563v3.813c0 0.844 0.406 0.969 0.906 0.969zM8.656 17.063v-4.344c0-0.281-0.219-0.563-0.563-0.563-0.281 0-0.531 0.25-0.531 0.563v4.344c0 0.281 0.219 0.5 0.563 0.5 0.281 0 0.531-0.219 0.531-0.5zM13.781 16.469v-3.813c0-0.281-0.219-0.5-0.563-0.5-0.25 0-0.531 0.156-0.531 0.5v2.75l-1.813-2.531c-0.25-0.438-0.563-0.719-0.938-0.719-0.469 0-0.5 0.375-0.5 0.906v4c0 0.281 0.219 0.5 0.531 0.5 0.281 0 0.531-0.188 0.531-0.5v-2.844l1.813 2.531c0.406 0.531 0.5 0.813 1 0.813 0.344 0 0.469-0.313 0.469-1.094zM17.281 14.313h-1.594v-0.906c0-0.094 0.031-0.219 0.188-0.219h1.406c0.344 0 0.563-0.188 0.563-0.531 0-0.406-0.313-0.531-0.594-0.531h-1.813c-0.563 0-0.844 0.375-0.844 0.875v3.531c0 0.625 0.25 0.969 0.844 0.969h1.844c0.406 0 0.563-0.25 0.563-0.563 0-0.406-0.313-0.531-0.563-0.531h-1.375c-0.125 0-0.219-0.094-0.219-0.188v-0.875h1.656c0.406 0 0.469-0.313 0.469-0.531 0-0.313-0.25-0.5-0.531-0.5z"
          ></path>
        </svg>
      </a>
    </div>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { ENDPOINT } from "@/constants/endpoint";

export default {
  data() {
    return {
      img: ENDPOINT.IMG,
      teacher: {},
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.user,
    }),
  },
  async mounted() {
    this.getTeacher();
  },
  methods: {
    methods: {
      openEmail(email) {
        console.log("email is ", email);
        // window.location.href("mailto:" + 'watcharachai.sa@gmail.com')
      },
      async getTeacher() {
        try {
          await this.$store.dispatch("user/getTeacher");
          this.teacher = this.user;
        } catch (error) {
          console.error("Error fetching teacher data:", error);
        }
      },
    },

    async getTeacher() {
      try {
        await this.$store.dispatch("user/getTeacher");
        this.teacher = this.user;
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
