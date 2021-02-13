<template>
  <div class="home">
    <div class="container mt-4">
      <div class="jumbotron">
        <h1 class="display-4">Dobro došli u aplikaciju FoodX</h1>
        <hr class="my-4" />
        <p>Pregledajte recepte:</p>
        <p class="lead">
          <router-link to="/Recepti" class="btn btn-primary btn-lg"
            >Recepti</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
