import Cookies from "js-cookie";
export default {
    namespaced: true,
    state: {
        token: ''
    },
    mutations: {
        setToken(state, val) {
            state.token = val
            Cookies.set('token', val)
        },
        clearToken(state) {
            state.token = '',
                Cookies.remove('token')
        },
        getToken(state, val) {
            state.token = Cookies.get('token')
        }
    }
}