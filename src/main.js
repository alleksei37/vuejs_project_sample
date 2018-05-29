// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
// import router from './router';

Vue.config.productionTip = false;

const rootElement = document.getElementById('search-app');

/* eslint-disable no-new */
const AppRoot = Vue.extend(App);
new AppRoot({
  el: rootElement,
  // router,
  propsData: { ...rootElement.dataset },
});
