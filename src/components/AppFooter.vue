<template>
  <footer class="app-footer">
    <p>© 2024 Fysiofresh. All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter', // Ensure multi-word name
};
</script>

<style scoped>
.app-footer {
  text-align: center;
  padding: 10px 20px;
  background-color: #887171;
  color: #fff9f3;
  position: fixed;
  width: 100%;
  bottom: 0;
  font-family: 'CustomFont', sans-serif; /* Ensure the custom font is applied */
}
</style>
