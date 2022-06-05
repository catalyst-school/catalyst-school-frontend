import { createApp } from 'vue';
import App from './App.vue';
import router from './ui/router';
import { createPinia } from 'pinia';
import 'quill/dist/quill.snow.css';

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount('#app');
