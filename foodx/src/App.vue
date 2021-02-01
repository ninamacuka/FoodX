<template>
  <div id="app">
    <div id="nav">
      <ul class="navbar-nav ml-auto">
        <li v-if="!store.currentUser" class="nav-item">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li v-if="!store.currentUser" class="nav-item">
          <router-link to="/register" class="nav-link">Sign up</router-link>
        </li>
        <li v-if="store.currentUser" class="nav-item">
          <a href="#" @click.prevent="logout()" class="nav-link">Logout</a>
        </li>
      </ul>
    </div>
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
