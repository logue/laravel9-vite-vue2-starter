import './bootstrap';
import '../css/app.css';

import Vue from 'vue';
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
    resolvePageComponent(
      `./Pages/${name}.vue`,
      import.meta.glob('./Pages/**/*.vue')
    ),
  setup({ el, app, props, plugin }) {
    // Add route function.
    Vue.mixin({ methods: { route: ziggy } });
    Vue.use(plugin);
    // @ts-ignore
    Vue.use(ZiggyVue, Ziggy);
    const App = new Vue({ render: h => h(app, props) });
    return App.$mount(el);
  },
});

InertiaProgress.init({ color: '#4B5563' });
