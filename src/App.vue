<template>
  <v-app>
    <!-- This is where the routed components (like KanbanBoard, AddTodo, etc.) will be shown -->
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
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
