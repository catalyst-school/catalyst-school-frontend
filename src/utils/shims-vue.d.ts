// for finding component in router class
/* eslint-disable */
declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<any>;
    export default component;
}
/* eslint-enable */
