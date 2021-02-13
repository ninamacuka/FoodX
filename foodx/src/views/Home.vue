<template>
  <div class="home">
    <div class="container mt-4">
      <div class="jumbotron">
        <h1 class="display-4">Dobro došli u aplikaciju FoodX</h1>
        <hr class="my-4" />
        <div v-if="store.currentUser">
          <p>Pregledajte recepte:</p>
          <p class="lead">
            <router-link to="/Recepti" class="btn btn-primary btn-lg"
              >Recepti</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store.js";
export default {
  name: "Home",
  data() {
    return {
      store,
    };
  },
};
</script>
