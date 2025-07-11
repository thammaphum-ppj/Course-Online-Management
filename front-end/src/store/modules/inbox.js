import axios from "axios";
import configAxios from "../../axios/configAxios";
import { ENDPOINT } from "../../constants/endpoint";
import Swal from "sweetalert2";

const state = {
  emails: [],
  questions: [],
};

const mutations = {
  SET_EMAILS(state, payload) {
    state.emails = payload;
  },
  SET_QUESTIONS(state, payload) {
    state.questions = payload;
  },
  UPDATE_QUESTION_STATUS(state, id) {
    const question = state.emails.find(email => email.id === id);
    if (question) {
      question.status = false;
      question.answered = true;
    }
  }
};

const actions = {
  async addEmails({ commit }, payload) {
    try {
      const url = `${ENDPOINT.INBOX}`;
      const res = await axios(configAxios("post", url, payload, payload.userId));
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Question sent successfully",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Error: ", error);
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "warning",
          title: "Please fill in the message",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  },
  async sentEmails({ commit }, payload) {
    try {
      const url = `${ENDPOINT.INBOX}/question-non-login`;
      const res = await axios(configAxios("post", url, payload));
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Question sent successfully",
          text: "",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Error: ", error)
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please enter a valid email address!",
        });
      }
    }
  },
  async getQuestion({ commit }) {
    const url = `${ENDPOINT.INBOX}`;
    try {
      const res = await axios(configAxios("get", url));
      if (res.status === 200) {
        commit("SET_EMAILS", res.data);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  },
  async countQuestion({ commit }) {
    const url = `${ENDPOINT.INBOX}/count-question`;
    try {
      const res = await axios(configAxios("get", url));
      commit("SET_QUESTIONS", res.data);
    } catch (error) {
      throw error;
    }
  },
  async updateQuestionStatus({ commit }, payload) {
    const newPayload = { status: payload.status }
    const url = `${ENDPOINT.INBOX}/${payload.id}/status`;
    try {
      const res = await axios(configAxios("patch", url, newPayload));
      commit("UPDATE_QUESTION_STATUS", res.data);
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
