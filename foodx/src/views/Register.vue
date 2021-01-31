<template>
  <div class="register">
    <h1>Register</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-9">
          <form>
            <div class="form-group">
              <label for="Email">Email:</label>
              <input
                v-model="email"
                type="Email"
                class="form-control"
                placeholder="Email"
              />
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                v-model="password"
              />
            </div>
            <div class="form-group">
              <label for="password2">Confirm Password:</label>
              <input
                type="password"
                class="form-control"
                placeholder="Confirm Password"
                v-model="password2"
              />
            </div>
            <button v-on:click.prevent="signup" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div class="col-sm-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebase } from "@/firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
      password2: "",
    };
  },
  methods: {
    signup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .catch(function (error) {
          console.log(error);
        })
        .then(() => {
          this.$router.replace({ name: "Login" });
        });
    },
  },
};
</script>