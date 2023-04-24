import './bootstrap';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/vue2';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
// @ts-expect-error
import { ZiggyVue } from 'ziggy-vue';
import teleport from '@logue/vue2-helpers/teleport';
import Vue, { type DefineComponent } from 'vue';

import ziggy from 'ziggy-js';

/** Application Name */
const appName =
  window.document.getElementsByTagName('title')[0]?.innerText ?? 'Laravel';

await createInertiaApp({
  title: title => `${title} - ${appName}`,
  progress: {
    color: import.meta.env.VITE_APP_INERTIA_PROGRESS_COLOR ?? '#4B5563',
  },
  resolve: async name =>
    await resolvePageComponent(
      `./Pages/${name}.vue`,
      import.meta.glob<DefineComponent>('./Pages/**/*.vue')
    ),
  setup({ el, App, props, plugin }) {
    // Add route function.
    Vue.mixin({ methods: { route: ziggy } });
    // Register Inertia
    Vue.use(plugin);
    // Telepot for vue2.
    Vue.component('Teleport', teleport);
    Vue.use(ZiggyVue, Ziggy);
    // @ts-expect-error
    return new Vue({ render: h => h(App, props) }).$mount(el);
  },
});
