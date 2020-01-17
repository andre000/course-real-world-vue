import Vue from 'vue';
import upperFirst from 'lodash.upperfirst';
import camelCase from 'lodash.camelcase';
import Vuelidate from 'vuelidate';
import 'nprogress/nprogress.css';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

const requireComponent = require.context(
  './components',
  false,
  /Base[A-Z]\w+\.(vue|js)$/,
);

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);

  const componentName = upperFirst(
    camelCase(
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1'),
    ),
  );

  Vue.component(
    componentName,
    componentConfig.default || componentConfig,
  );
});

Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
