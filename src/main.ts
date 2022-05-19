import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { TopicService } from './services/TopicService';

const app = createApp(App);

app.use(router);
app.provide('services', {
    topicService: new TopicService(),
});

app.mount('#app');
