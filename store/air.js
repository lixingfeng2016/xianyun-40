export const state = () => ({
    // 历史搜索记录
    history:[],

    // 机票总价
    price:0
});

export const mutations = {
    setHistory(state, data){
        state.history.unshift(data);
    }
    ,

    priceAll(state,data){
        state.price=data
        // console.log(data);
        
    }
}