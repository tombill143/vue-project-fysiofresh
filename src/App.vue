<template>
  <v-app>
    <KanbanBoard />
  </v-app>
</template>

<script>
// Corrected the import statement with double quotes and removed unwanted characters
import KanbanBoard from './components/KanbanBoard.vue';

export default {
  name: 'App', // Double quotes for consistency
  components: {
    KanbanBoard, // Comma added to separate components
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: left; /* Change to left to avoid centering inline elements */
  color: #2c3e50;
  margin-top: 0; /* Remove or reduce top margin */
  display: block; /* Ensure it’s a block-level container */
}
</style>
