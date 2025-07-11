import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";

const state = {
  courses: [],
};

const mutations = {
  ADD_COURSE: (state, addcourse) => {
    state.courses.push(addcourse);
  },
  UPDATE_COURSE: (state, updatedCourse) => {
    const index = state.courses.findIndex(course => course.id === updatedCourse.id);
    if (index !== -1) {
      state.courses.splice(index, 1, updatedCourse);
    }
  },
};

const actions = {
  //รอรวม
  // async addCourse({ commit }, addcourse) {
  //   const url = `${ENDPOINT.COURSE}/uploads`;
  //   const formData = new FormData();
  //   formData.append("name", addcourse.name);
  //   formData.append("price", addcourse.price);
  //   formData.append("detail", addcourse.detail);
  //   formData.append("status", addcourse.status);
  //   formData.append("category", addcourse.category);
  //   for (const item of addcourse.images) {
  //     formData.append("files", item)
  //   }
  //   try {
  //     const res = await axios(configAxios("post", url, formData));
  //     commit("ADD_COURSE", res.data);
  //   } catch (error) {
  //     console.error("Failed to add course", error);
  //   }
  // },
  async updateCourse({ commit }, updatedCourse) {
    const url = `${ENDPOINT.COURSE}/${updatedCourse.id}`;
    const formData = new FormData();
    formData.append("name", updatedCourse.name);
    formData.append("price", updatedCourse.price);
    formData.append("detail", updatedCourse.detail);
    formData.append("status", updatedCourse.status);
    formData.append("category", updatedCourse.category);
    for (const item of updatedCourse.images) {
      formData.append("files", item)
    }
    // try {
    //   const res = await axios(configAxios("patch", url, formData));
    //   commit("UPDATE_COURSE", res.data);
    // } catch (error) {
    //   console.error("Failed to update course", error);
    // }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
