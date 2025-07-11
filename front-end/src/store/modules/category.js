import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";
import Swal from "sweetalert2";
import _ from "lodash";

const state = {
  names: [],
};

const mutations = {
  SET_NAMES: (state, payload) => {
    state.names = payload;
  },
};

const actions = {
  async names({ commit }, payload) {
    console.log("payload", payload);
    try {
      const url = `${ENDPOINT.CATEGORY}`;
      console.log("url is ", url);

      const res = await axios(configAxios("post", url, payload));

      if (res.status == 201) {
        await this.dispatch("category/getCategory", {
          category: true,
        });
        Swal.fire({
          icon: "success",
          title: "Category added successfully",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.log("error  >>> ", error);
      if (error.response.status == 400) {
        Swal.fire({
          icon: "warning",
          title: "Please fill in information",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      if (error.response.status == 409) {
        Swal.fire({
          icon: "warning",
          title: "This category has been added",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  },
  async getCategory({ commit }, payload) {
    let url = `${ENDPOINT.CATEGORY}`;
    try {
      const res = await axios(configAxios("get", url));
      if (res.status == 200) {
        console.log("res cate?", res.data);
        commit("SET_NAMES", res.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  },
  async deleteCategory({ commit }, categoryId) {
    try {
      const url = `${ENDPOINT.CATEGORY}/${categoryId}`;
      const res = await axios(configAxios("delete", url));

      if (res.status === 200) {
        await this.dispatch("category/getCategory", {
          category: true,
        });
        Swal.fire({
          icon: "success",
          title: "Category successfully deleted",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
        commit("SET_NAMES", res.data);
        // location.reload();
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  },
  async updateCategory({ commit }, { categoryId, newData }) {
    try {
      console.log("categoryId:", categoryId);
      console.log("newData:", newData);
      const url = `${ENDPOINT.CATEGORY}/${categoryId}`;
      const res = await axios(configAxios("patch", url, newData));
      if (res.status === 200) {
        await this.dispatch("category/getCategory", {
          category: true,
        });
        Swal.fire({
          icon: "success",
          title: "Category updated successfully",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Error updating category:", error);
      if (error.response.status == 400) {
        Swal.fire({
          icon: "warning",
          title: "Please fill in information",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      if (error.response.status == 409) {
        Swal.fire({
          icon: "warning",
          title: "This category has been added",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
