/// <reference types="vite/client" />

export declare global {
  import type { AxiosStatic } from 'axios';
  import type { Config } from 'ziggy-js';
  interface Window {
    // add you custom properties and methods
    axios: AxiosStatic;
  }
  const Ziggy: Config;
}

/** Vue */
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'ziggy-vue';

/**
 * Augment vue-test-utils to add support for Vue 2.7.
 *
 * @see {@link https://github.com/vuejs/vue-test-utils/issues/2026#issuecomment-1429963862}
 */
declare module '@vue/test-utils' {
  /**
   * Component declared with defineComponent
   *
   * @param component -
   * @param options -
   */
  export function mount<
    PropsOrPropOptions = Record<StaticRangeInit, any>,
    RawBindings = Record<StaticRangeInit, any>,
    D = Record<StaticRangeInit, any>,
    C extends ComputedOptions = ComputedOptions,
    M extends MethodOptions = MethodOptions,
    Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
    Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
    E extends EmitsOptions = Record<string, any>,
    EE extends string = string,
    Props = Readonly<ExtractPropTypes<PropsOrPropOptions>>,
    Defaults extends Record<
      StaticRangeInit,
      any
    > = ExtractDefaultPropTypes<PropsOrPropOptions>,
  >(
    component: DefineComponent<
      PropsOrPropOptions,
      RawBindings,
      D,
      C,
      M,
      Mixin,
      Extends,
      E,
      EE,
      Props,
      Defaults
    >,
    options?: any
  ): Wrapper<
    InstanceType<
      DefineComponent<
        PropsOrPropOptions,
        RawBindings,
        D,
        C,
        M,
        Mixin,
        Extends,
        EmitsOptions,
        EE,
        Props,
        Defaults
      >
    >
  >;

  /**
   * Component declared with defineComponent
   *
   * @param component -
   * @param options -
   */
  export function shallowMount<
    PropsOrPropOptions = Record<StaticRangeInit, any>,
    RawBindings = Record<StaticRangeInit, any>,
    D = Record<StaticRangeInit, any>,
    C extends ComputedOptions = ComputedOptions,
    M extends MethodOptions = MethodOptions,
    Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
    Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
    E extends EmitsOptions = Record<string, any>,
    EE extends string = string,
    Props = Readonly<ExtractPropTypes<PropsOrPropOptions>>,
    Defaults extends Record<
      StaticRangeInit,
      any
    > = ExtractDefaultPropTypes<PropsOrPropOptions>,
  >(
    component: DefineComponent<
      PropsOrPropOptions,
      RawBindings,
      D,
      C,
      M,
      Mixin,
      Extends,
      E,
      EE,
      Props,
      Defaults
    >,
    options?: any
  ): Wrapper<
    InstanceType<
      DefineComponent<
        PropsOrPropOptions,
        RawBindings,
        D,
        C,
        M,
        Mixin,
        Extends,
        EmitsOptions,
        EE,
        Props,
        Defaults
      >
    >
  >;
}

interface ImportMetaEnv {
  // see https://vitejs.dev/guide/env-and-mode.html#env-files
  // add .env variables.
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_WEBSTORAGE_NAMESPACE: string;
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
