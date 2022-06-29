import './bootstrap';
import '../css/app.css';

import Vue from 'vue';
import VueCompositionAPI, { createApp, h } from '@vue/composition-api';
import { createInertiaApp } from '@inertiajs/inertia-vue';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';

Vue.config.productionTip = false;
Vue.use(VueCompositionAPI);
import ziggy from 'ziggy-js';

/** Application Name */
const appName =
  window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name =>
    resolvePageComponent(
      `./Pages/${name}.vue`,
      import.meta.glob('./Pages/**/*.vue')
    ),
  setup({ el, app, props, plugin }) {
    const App = createApp({ render: () => h(app, props) });
    // Add route function.
    App.mixin({ methods: { route: ziggy } });
    App.use(plugin);
    // @ts-ignore
    App.use(ZiggyVue, Ziggy);

    return App.mount(el);
  },
});

InertiaProgress.init({ color: '#4B5563' });
