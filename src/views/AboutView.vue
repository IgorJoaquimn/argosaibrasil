<template>
  <div class="about">
    <h1>About Argos AI Brasil</h1>
    <p>This is the about page for Argos AI Brasil project.</p>
    <p>
      Welcome to our Vue 3 Single Page Application built with:
    </p>
    <ul>
      <li>Vue 3 with Composition API</li>
      <li>TypeScript for type safety</li>
      <li>Vue Router for navigation</li>
      <li>Pinia for state management</li>
      <li>Vite for fast development</li>
    </ul>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
}

.about ul {
  text-align: left;
  max-width: 400px;
}
</style>
