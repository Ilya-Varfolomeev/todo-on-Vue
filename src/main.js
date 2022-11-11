import { createApp } from "vue";
import { createPinia } from "pinia";
import { rootStore } from "./store/rootStore";

import App from "./App.vue";
import "./assets/main.css";

const pinia = createPinia(rootStore);
const app = createApp(App);

app.use(pinia);
app.mount("#app");
