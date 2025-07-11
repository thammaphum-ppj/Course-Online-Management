import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";
import router from "../../router/index";
import Swal from "sweetalert2";
import _ from "lodash";

const state = {
  user: [],
  users: [],
  // status: [],
};
const mutations = {
  SET_USER: (state, payload) => {
    console.log("Commit SET_USER with data:", payload); // Debugging line
    state.user = payload;
  },
  SET_USERS: (state, payload) => {
    state.users = payload;
  },
  // SET_STATUS: (state, payload) => {
  //   state.status = payload;
  // },
};
const actions = {
  async createUser({ commit }, payload) {
    const url = `${ENDPOINT.USER}`;
    console.log("url", url);
    try {
      // const res = await axios(configAxios("post", url, payload));
      await axios.post(url, payload).then((res) => {
        console.log("created user OK", res);

        if (res.status == 201) {
          Swal.fire({
            icon: "success",
            title: "Successfully applied for membership",
            text: "",
            showConfirmButton: false,
            timer: 2000,
          });
          router.push({ path: "/login" });
        }
      });
    } catch (error) {
      console.log("error  >>> ", error);
      if (error.response.status == 400) {
        Swal.fire({
          icon: "warning",
          title: "Please fill out the information completely",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      if (error.response.status == 409) {
        Swal.fire({
          icon: "warning",
          title: "This email has already been used",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  },
  async getUser({ commit }, payload) {
    let url = `${ENDPOINT.USER}`;

    if (!_.isEmpty(payload)) {
      if (payload?.question) {
        url = `${url}?questions=${payload?.question}`;
        console.log("url", url);
      }
      try {
        const res = await axios(configAxios("get", url));
        if (res.status == 200) {
          commit("SET_USERS", res.data);
        }
      } catch (error) {
        Swal.fire({
          icon: "success",
          title: "Question sent successfully",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } else {
      try {
        const res = await axios(configAxios("get", url));
        commit("SET_USER", res.data);
      } catch (error) {
        throw error;
      }
    }
  },
  async updateUser({ commit }, { userId, newData }) {
    try {
      console.log("updateUser :", userId);
      console.log("newData:", newData);
      const url = `${ENDPOINT.USER}/${userId}`;
      const res = await axios(configAxios("patch", url, newData));

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Profile edited successfully",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Error >> ", error);
      if (error.response.status == 400) {
        Swal.fire({
          icon: "warning",
          title: "Please fill out the information completely",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
      if (error.response.status == 409) {
        Swal.fire({
          icon: "warning",
          title: "This email has already been used",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  },
  async updateUserPassword({ commit }, { userId, newData }) {
    try {
      console.log("updateUser :", userId);
      console.log("newData:", newData);
      const url = `${ENDPOINT.USER}/${userId}`;
      const res = await axios(configAxios("patch", url, newData));

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Password changed successfully",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Error >> ", error);

    }
  },
  async updateTeacher({ commit }, { newData }) {
    const url = `${ENDPOINT.USER}/teacher-profile`;
    const formData = new FormData();
    formData.append("fname", newData.fname);
    formData.append("lname", newData.lname);
    formData.append("phone", newData.phone);
    formData.append("email", newData.email);
    formData.append("desc", newData.desc);
    formData.append("linkEmail", newData.linkEmail);
    formData.append("linkFacebook", newData.linkFacebook);
    // formData.append("linkLine", newData.linkLine);
    formData.append("file", newData.userImage);

    console.log("newData:", newData);
    try {
      const res = await axios(configAxios("patch", url, formData));

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Profile edited successfully",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Error updating fail:", error);
    }
  },
  async updateTeachernoImage({ commit }, { newData }) {
    const url = `${ENDPOINT.USER}/teacher-profile-non-image`;
    try {
      const res = await axios(configAxios("patch", url, newData));
      console.log("res data", res);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Profile edited successfully",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Error updating fail:", error);
    }
  },
  async updateStatus({ commit }, payload) {
    console.log("payload", `${ENDPOINT.USER}/update-status/${payload.id}`);
    try {
      const url = `${ENDPOINT.USER}/update-status/${payload.id}`;
      const res = await axios(configAxios("patch", url, payload));
      console.log("response", res);
      if (res.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Successfully edited",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
        await this.dispatch("user/getUser");
        await this.dispatch('auth/checkUser', this.state.user)

      }
    } catch (error) {
      console.log("error >> ", error);
    }
  },
  // async updateStatus({ commit }, payload) {
  //   console.log("payload", `${ENDPOINT.USER}/update-status/${payload.id}`);
  //   try {
  //     const url = `${ENDPOINT.USER}/update-status/${payload.id}`;
  //     const res = await axios(configAxios("patch", url, payload));
  //     console.log("response", res);
  
  //     if (res.status == 200) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Successfully edited",
  //         text: "",
  //         showConfirmButton: false,
  //         timer: 2000,
  //       });
  //     }
  //     if (res.data.active === false) {
  //       console.log('passss');
  //       await commit("auth/logout");
  //     } else {
  //       console.log('faillll');
  //       await this.dispatch("user/getUser");
  //     }
  //   } catch (error) {
  //     console.log("error >> ", error);
  //   }
  // },
  async getTeacher({ commit }, payload) {
    let url = `${ENDPOINT.USER}/get-teacher-profile`;
    try {
      const res = await axios(configAxios("get", url));
      console.log("Response data from API:", res.data); // Debugging line
      commit("SET_USER", res.data);
    } catch (error) {
      throw new Error();
    }
  },
  async countUser({ commit }, payload) {
    let url = `${ENDPOINT.USER}/count-user`;
    try {
      const res = await axios(configAxios("get", url));
      commit("SET_USERS", res.data);
    } catch (error) {
      throw error;
    }
  },
  
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
