// for finding component in router class
declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<HomeView, TopicList, TopicBuilder, TheoryForm>;
    export default component;
}
