import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "",
    component: () => import("../layout/BaseLaoutHome.vue"),
    children: [
      {
        path: "/homepage",
        name: "homepage",
        component: () => import("../views/HomePage.vue"),
        meta: { requiresGuest: true },
      },
      {
        path: "/guestallcourse",
        name: "guestallcourse",
        component: () => import("../components/AllCourseUnlog.vue"),
        meta: { requiresGuest: true },
      },
      {
        path: "/guestdetailcourse/:id",
        name: "guestdatailcourse",
        component: () => import("../views/DetailCourseUnlog.vue"),
        meta: { requiresGuest: true },
      },
      {
        path: "/addcourse",
        name: "addcourse",
        component: () => import("../views/AddCourse.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/coursemanage",
        name: "coursemanage",
        component: () => import("../views/CourseManage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/allconfrime",
        name: "allconfrime",
        component: () => import("../views/AllconfrimedCourse.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/cancle-order",
        name: "cancle-order",
        component: () => import("../views/AllCancleCourse.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: '/editcourse/:id',
        name: 'EditCourse',
        component: () => import("../components/EditCourse.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/usermanage",
        name: "usermanage",
        component: () => import("../views/UserManage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/category",
        name: "category",
        component: () => import("../views/Category.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/courseorder",
        name: "courseorder",
        component: () => import("../views/CourseOrder.vue")
      },
      {
        path: "/teacherprofile",
        name: "teacherprofile",
        component: () => import("../views/EditProfileTeacher.vue")
      },
      {
        path: "/inbox",
        name: "inbox",
        component: () => import("../views/Inbox.vue")
      },
      {
        path: "/login",
        name: "login",
        component: () => import("../views/Login.vue"),
        meta: { requiresGuest: true },
      },
      {
        path: "/register",
        name: "register",
        component: () => import("../views/Register.vue"),
        meta: { requiresGuest: true },
      },
      
    ],
  },
  {
    path: "",
    component: () => import("@/layout/BaseLayout.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/Main.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("../views/Dashboard.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/allcourse",
        name: "allcourse",
        component: () => import("../components/AllCourse.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/interested",
        name: "interested",
        component: () => import("../views/InterestedCourse.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/change-password",
        name: "change-password",
        component: () => import("../views/ChangePassword.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/mycourse",
        name: "mycourse",
        component: () => import("../views/MyCourse.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/edit-profile",
        name: "edit-profile",
        component: () => import("../views/EditProfile.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/detailcourse/:id",
        name: "detailcourse",
        component: () => import("../views/DetailCourse.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/endcourse",
        name: "endcourse",
        component: () => import("../views/EndCourse.vue"),
        meta: { requiresAuth: true },
      },
     
    ],
  },
  {
    path: "",
    component: () => import("../layout/FullPage.vue"),
    children: [],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  console.log("token", token);
  return token !== null && token !== undefined;
};

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated()) {
    if (to.name !== 'detailcourse') { // Avoid redirect loop
      next({ name: 'detailcourse', params: { id: '' } }); // Replace 'default-id' with an appropriate id
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest) && isAuthenticated()) {
    const role = localStorage.getItem("role");
    if (role === 'user') {
      next({ name: 'home' });
    } else {
      next({ name: 'dashboard' });
    }
  } else {
    next();
  }
});

export default router;
