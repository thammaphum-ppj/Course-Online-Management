import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";
import router from "../../router/index";
import course from "./course";

const state = {
  courses: [],
};

const mutations = {
  ADD_COURSE: (state, addcourse) => {
    state.courses.push(addcourse);
  },
};

const actions = {
  async addCourse({ commit }, addcourse) {
    const url = `${ENDPOINT.COURSE}`;
    console.log("Dai mai",addcourse);
    const formData = new FormData();
    formData.append("courseName", addcourse.name);
    formData.append("price", addcourse.price);
    formData.append("description", addcourse.detail);
    // formData.append("categoryId",addcourse.category);
    formData.append("categoryId", 1);

    for (const item of addcourse.images) {
      formData.append("files",item)
    }
    console.log("mayung",formData);
    try {
      const res = await axios(configAxios("post", url, formData));
      console.log("ข้อมูลส่งได้มั้ย",addcourse);
      console.log("Course added successfully", res);
      commit("ADD_COURSE", res.data);
      
    } catch (error) {
      console.error("Failed to add addcourse", error);
      
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
