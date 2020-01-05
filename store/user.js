export const state = () => ({
  userInfo: {}
});

export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data
  }
}


// 异步存数据
export const actions = {
  login(store, data) {
    return this.$axios({
      url: '/accounts/login',
      method: 'POST',
      data
    }).then(res => {
      console.log(res);

      store.commit('setUserInfo', res.data)
      return true
    }).catch(err => {
      console.log(err);

      return false
    })
  },


  // 验证码
  validate({
    commit
  }, data) {
    return this.$axios({
      url: '/captchas',
      method: 'POST',
      data: {
        tel: data
      }
    }).then(res => {
      console.log(res);
      return res.data.code
    }).catch(err => {
      return false
    })
  },


  register(store, data) {
    return this.$axios({
      url: "/accounts/register",
      method: "POST",
      data
    }).then(res => {
      store.commit('setUserInfo', res.data)
      return true
    })
  }

}
