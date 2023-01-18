import './bootstrap';
import '../css/app.css';

import Vue from 'vue';
import teleport from '@logue/vue2-helpers/teleport';
import { createInertiaApp } from '@inertiajs/vue2';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';

import ziggy from 'ziggy-js';

/** Application Name */
const appName =
  window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
  title: title => `${title} - ${appName}`,
  progress: {
    color: import.meta.env.VITE_APP_INERTIA_PROGRESS_COLOR || '#4B5563',
  },
  resolve: name =>
    // @ts-ignore
    resolvePageComponent(
      `./Pages/${name}.vue`,
      import.meta.glob('./Pages/**/*.vue')
    ),
  // @ts-ignore
  setup({ el, App, props, plugin }) {
    // Add route function.
    Vue.mixin({ methods: { route: ziggy } });
    // Register Inertia
    Vue.use(plugin);
    // Telepot for vue2.
    Vue.component('Teleport', teleport);
    // @ts-ignore
    Vue.use(ZiggyVue, Ziggy);

    return new Vue({ render: h => h(App, props) }).$mount(el);
  },
});
