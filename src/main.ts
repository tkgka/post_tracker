import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import vuecookies from "vue-cookies";
Vue.use(vuecookies);
Vue.$cookies.config("1d");
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
