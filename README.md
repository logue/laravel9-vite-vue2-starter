# Laravel 10 + Breeze + Vite + Vue2 + TypeScript Starter Template

This project is a starter project to make the front end of [Laravel 10](https://github.com/laravel/laravel) + [Breeze](https://github.com/laravel/breeze) with [Vue 2.7.14](https://vuejs.org/). The front-end build system has Vite that supports default from Laravel `9.3.9`, which enables high-speed compilation.

The language used is TypeScript. The Vue part adopts the [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html) writing method, but it is also possible to install [vue-propertey-decolator](https://github.com/kaorun343/vue-property-decorator) etc. if necessary.

Also, in order to maintain the code quality, [Laravel Pint](https://github.com/laravel/pint) is built in PHP in advance, and [ESLint](https://eslint.org/) setting of [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html) is built in the TypeScript part. (Same as [vite-vue2-ts-starter](https://github.com/logue/vite-vue2-ts-starter).)

If you are using an older version, delete `node_moduls` and `yarn.lock` and recreate the FE environment just in case.

## Usage

1. Clone or download release this project.
2. Type `composer install` and `yarn install`.
3. Copy `.env.example` and rename `.env`.
4. Type `php artisan key:generate`.
5. Type `yarn run dev` to launch php and vite dev server.

## Known issue

- [inertia-link](https://inertiajs.com/links) outputs an error on vue-tsc. Run `build-only` when building.

## See also

- [vite-vue2-ts-starter](https://github.com/logue/vite-vue2-ts-starter)
- [vue-inertia-composable](https://github.com/logue/vue-inertia-composable)
- [@logue/vue2-helpers](https://github.com/logue/vue2-helpers) - If you want use vue-router, vuex, vuetify in compositon api. it is required.

## LISENCE

MIT
