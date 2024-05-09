export const state = () => ({
    data: {},
})
  
export const mutations = {
    UPDATE_DATA(state, payload) {
        state.data = Object.assign({}, state.data, payload);
    },
}

export const actions = {
    // THIS IS JUST A TEST
    // YOU MAY INCLUDE ACTUAL AXIOS
    // this.$axios.[method](url, payload)
    // .then((res) => {
    // })
    // .catch((err) => {
    // });
    async LOAD_TEST ({ commit }, payload) {
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                return resolve({ name: 'Test' });
            }, 2000);
        })

        const response = await promise;
        commit('UPDATE_DATA', response);
    }
};