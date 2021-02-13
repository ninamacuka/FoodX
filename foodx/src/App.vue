<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">
        <img alt="Vue logo" :src="logo" style="height: 50%; width: 50%" />
      </a>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li v-if="!store.currentUser" class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li v-if="!store.currentUser" class="nav-item">
            <router-link to="/register" class="nav-link">Sign up</router-link>
          </li>
          <li v-if="store.currentUser" class="nav-item">
            <router-link to="/noviRecept" class="nav-link"
              >Dodaj recept</router-link
            >
          </li>
          <li v-if="store.currentUser" class="nav-item">
            <router-link to="/Recepti" class="nav-link">Recepti</router-link>
          </li>
          <li v-if="store.currentUser == 'admin@unipu.hr'" class="nav-item">
            <router-link to="/admin" class="nav-link">Admin</router-link>
          </li>
          <li v-if="store.currentUser" class="nav-item">
            <router-link
              class="nav-link"
              :to="{ name: 'Profil', params: { email: store.currentUser } }"
              >Profil</router-link
            >
          </li>
          <li v-if="store.currentUser" class="nav-item">
            <a href="" @click.prevent="logout()" class="nav-link">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script>
import { firebase } from "@/firebase";
import store from "@/store.js";
import router from "@/router";
import logo from "@/assets/logo.png";
firebase.auth().onAuthStateChanged((user) => {
  const currentRoute = router.currentRoute;
  if (user) {
    // User is signed in.
    console.log("*** User", user.email);
    store.currentUser = user.email;
    // take me home
    if (!currentRoute.meta.needsAuth) {
      router.push({ name: "Home" }).catch(() => {});
    }
  } else {
    // User is not signed in.
    console.log("*** No user");
    store.currentUser = null;
    // kick me out
    if (currentRoute.meta.needsAuth) {
      router.push({ name: "Login" }).catch(() => {});
    }
  }
});
export default {
  data() {
    return {
      store,
      logo,
    };
  },
  methods: {
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(function () {
          console.log("Signed Out");
        });
    },
  },
};
</script>