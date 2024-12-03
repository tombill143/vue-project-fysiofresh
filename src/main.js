import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Import Vuetify styles
import { VApp } from 'vuetify/components'; // Explicitly import VApp

const app = createApp(App);

// Create Vuetify instance
const vuetify = createVuetify({
  components: {
    VApp, // I need to Register the v-app component here
  },
});

app.use(vuetify); // Use Vuetify instance
app.mount('#app');
