export const state={
    // userName:'/锋哥'
    userInfo:{}
};

export const mutations= {
    setUserInfo(state,data){
        state.userInfo=data
    },
    // cleanUserInfo(state,info){

    // }
}


// 异步存数据
export const actions= {
    login(store,data){
       return this.$axios({
            url:'/accounts/login',
            method:'POST',
            data
        }).then(res=>{
            console.log(res);
            
            store.commit('setUserInfo', res.data)
            return true
        }).catch(err=>{
            console.log(err);
            
            return false
        })
    },

    validate({commit},data){
            return this.$axios({
                url:'/captchas',
                method:'POST',
                data:{tel:data}
            }).then(res=>{
                console.log(res);
                return res.data.code
            }).catch(err=>{
                return false
            })
    }
    
}