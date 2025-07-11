import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";
import Swal from "sweetalert2";

const state = {
  favorite: {},
};

const mutations = {
  SET_FAVORITE: (state, payload) => {
    state.favorite = payload;
  },
  REMOVE_FAVORITE: (state, courseId) => {
    state.favorite = state.favorite.filter(course => course.id !== courseId);
  }
};

const actions = {
  async updateFavorite({ commit }, payload) {
    try {
      console.log("payloadpayloadpayload", payload);
      const url = `${ENDPOINT.FAVORITE}/${payload.userId}/courses/${payload.courseId}`;
      const res = await axios(configAxios("post", url));

      console.log("resssssss", res);
      if (res.status === 201) {
        await this.dispatch("category/getCategory", {
          category: true,
        });
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  },

  async deleteFavorite({ commit }, payload) {
    try {
      const url = `${ENDPOINT.FAVORITE}/${payload.userId}/courses/${payload.courseId}`;
      const res = await axios(configAxios("delete", url));
      console.log("deleteFavorite", res);
      if (res.status == 200) {
        commit("REMOVE_FAVORITE", payload.courseId);
        await this.dispatch("category/getCategory");
        await this.dispatch("course/getCourse");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  },

  async getFavorite({ commit }, payload) {
    try {
      const url = `${ENDPOINT.FAVORITE}/${payload.userId}/courses`;
      const res = await axios(configAxios("get", url));
      console.log("getFavorite", res);
      if (res.status == 200) {
        console.log("res cate?", res.data);
        commit("SET_FAVORITE", res.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
