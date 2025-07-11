import axios from 'axios';
const state = {
  dataSate: [], //(3)
};
const getters = {

};
const mutations = {
  SET_DATA: (state, data) => { //ชื่อต้องตรงกัน รับค่าที่รับมาจากด้านล่าง (2)
    state.dataSate = data;
  },
};
const actions = {
  async getDatafromApi({ commit }, data) {
    const url = 'https://api.publicapis.org/entries'
    const responst = axios(configAxios('post','http://localhost:3000/auth/status',data))
    await axios.get(url,).then((res) => { //การประกาศ แล้วทำอะไรต่อ เพื่อไปยังข้อมูลหลังบ้าน
      commit('SET_DATA', res.data); // รีบ api บันทึก แล้วส่งไปดานบน data (1) 
    });
  },
};
export default { // เพื่อทำให้การทำงานทั้งหมดทำงาน
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};