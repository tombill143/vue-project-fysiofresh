import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Import Vuetify styles
import { VApp } from 'vuetify/components'; // Explicitly import VApp
import { createRouter, createWebHistory } from 'vue-router'; // Import Vue Router
import KanbanBoard from './components/KanbanBoard.vue'; // Import KanbanBoard component
import AddTodo from './components/AddTodo.vue'; // Import AddTodo component

// Define routes
const routes = [
  {
    path: '/',
    name: 'KanbanBoard',
    component: KanbanBoard,
  },
  {
    path: '/add-todo',
    name: 'AddTodo',
    component: AddTodo,
  },
];

// Create Vue Router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Create Vuetify instance
const vuetify = createVuetify({
  components: {
    VApp, // Register VApp component
  },
});

// Create Vue app instance
const app = createApp(App);

// Use Vue Router and Vuetify in the app
app.use(router); // Use Vue Router instance
app.use(vuetify); // Use Vuetify instance

// Mount the app
app.mount('#app');
