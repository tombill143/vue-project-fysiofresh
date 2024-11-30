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
  text-align: left;
  color: #2c3e50;
  margin: 0; /* Remove default margins */
  display: block;
  height: 100vh; /* Set height to the full viewport height */
  box-sizing: border-box; /* Ensure padding/border are included in the height */
  overflow: hidden; /* Prevent overflow if content exceeds the screen */
}
</style>
