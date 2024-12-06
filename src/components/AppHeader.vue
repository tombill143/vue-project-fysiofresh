<template>
  <header class="app-header">
    <!-- Logo on the right -->
    <div class="logo-container">
      <img src="@/assets/flower.png" alt="Flower" class="flower-logo" />
      <img
        src="@/assets/fysiofresh-logo-text (1).svg"
        alt="Fysiofresh Logo"
        class="header-logo"
      />
    </div>
    <h1 class="header-title">Job Dashboard</h1>

    <nav class="header-nav">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader', // Ensure multi-word name otherwise vue will have kittens
};
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #887171;
  color: #fff9f3;
  font-family: 'CustomFont', sans-serif; /* Ensure the custom font is applied */
}

.header-title {
  font-size: 1.5rem;
}

.header-logo {
  max-height: 40px;
  -o-object-fit: contain;
  object-fit: contain;
  margin-left: -2rem;
  padding-top: 8px;
}

.header-nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.header-nav ul li {
  margin-right: 15px;
}

.header-nav ul li a {
  color: #fff9f3;
  text-decoration: none;
  font-weight: bold;
}

.header-nav ul li a:hover {
  text-decoration: underline;
}

.flower-logo {
  width: 30px; /* Adjust the size as per your requirement */
  height: auto; /* Maintain aspect ratio */
  margin-right: 10px; /* Space between flower and text logo */
}
</style>
