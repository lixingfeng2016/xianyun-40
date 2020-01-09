export const state = () => ({
    // 存到草稿
    draft:[]
});

export const mutations = {
    setDrafts(state, data){
        state.draft.unshift(data);
    }
}