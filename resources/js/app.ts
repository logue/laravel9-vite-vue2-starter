import './bootstrap';
import '../css/app.css';

import Vue from 'vue';
import Teleport from 'vue2-teleport';
import { createInertiaApp } from '@inertiajs/inertia-vue';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';

import ziggy from 'ziggy-js';

/** Application Name */
const appName =
  window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name =>
    // @ts-ignore
    resolvePageComponent(
      `./Pages/${name}.vue`,
      import.meta.glob('./Pages/**/*.vue')
    ),
  setup({ el, app, props, plugin }) {
    // Add route function.
    Vue.mixin({ methods: { route: ziggy } });
    // Register Inertia
    Vue.use(plugin);
    // Telepot for vue2.
    Vue.component('Teleport', Teleport);
    // @ts-ignore
    Vue.use(ZiggyVue, Ziggy);

    const App = new Vue({ render: h => h(app, props) });
    return App.$mount(el);
  },
});

InertiaProgress.init({
  color: import.meta.env.VITE_APP_INERTIA_PROGRESS_COLOR || '#4B5563',
});
