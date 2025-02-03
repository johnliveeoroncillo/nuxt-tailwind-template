import Vue from "vue";
import copy from 'copy-to-clipboard';

const mixin = {
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error, $axios}) {
        // await $axios.get('/check')
        //     .then((res) => {
        //         const { data } = res;
        //         const { data: settings } = data;
        //         console.log('SSR CHECK', JSON.stringify(settings));
        //         store.commit('UPDATE_MAINTENANCE', settings.maintenance);
        //         store.commit('UPDATE_ENCASHMENT_FLAG', settings.encashmentFlag);
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //         store.commit('UPDATE_MAINTENANCE', false);
        //         store.commit('UPDATE_ENCASHMENT_FLAG', settings.encashmentFlag);

        //     });
        
        // if (store.state.maintenance) {
        //     return;
        // }

        // if (query.referral) {
        //     console.log('REFERRAL', query.referral);
        //     console.log(route, res);
        //     sessionStorage.setItem('FX_REFERRAL', JSON.stringify({ referral_username: query.referral, referral_name: ''}));
        //     route.query = null;
        //     redirect(route);
        // }
       
    },
    data() {
        return {
            errorInput: {},
        }
    },
    computed: {
        testData() {
            return this.$store.state.data;
        }
    },
    methods: {
        cloneObject(obj) {
            return JSON.parse(JSON.stringify(obj));
        },
        addErrorInput(errors) {
            this.errorInput = {};
            this.errorInput = Object.assign({}, this.errorInput, errors);
        },
        parseError(error) {
            if (error.errors) {
                this.errorInput = Object.assign({}, error.errors);
            }
            if (error.errors && error.errors.lists) {
                this.$toast.error(error.errors.lists);
            } 
            
            if (!error.errors) {
                this.$toast.error(error.message);
            }
        },
        logout() {
            this.$auth.logout();
            this.$router.replace('/');
        },
        jsonToQuery(json) {
            return Object.keys(json).map((key) => {
                let value = json[key];
                if (typeof value === 'object') {
                    value = JSON.stringify(value);
                }

                return key + '=' + value
            }).join('&');
        },
        copyCode(code, message) {
            copy(code);
            this.$toast.success(!message ? 'Account code copied!' : message);
        },
        format(number = 0, currency = true) {
            if (number === 0) number = 0;
            if (!currency) return parseFloat(number).toFixed(2);
            
            const format = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'PHP',
                currencyDisplay: 'narrowSymbol',
            });
            return format.format(number);
        },
        randomString(length) {
            const chars = '0123456789';
            let result = '';
            for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        },
    },
}

Vue.mixin(mixin);
