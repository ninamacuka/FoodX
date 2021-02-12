<template>
  <div class="row">
    <div class="col-8">
      <form @submit.prevent="Profil">
        <div class="form-group">
          <label for="imageUrl">Ime</label>
          <input
            v-model="ime"
            type="text"
            class="form-control ml-2"
            :placeholder="profil.ime"
            id="ime"
          />
        </div>
        <div class="form-group">
          <label for="prezime">Prezime</label>
          <input
            v-model="prezime"
            type="text"
            class="form-control ml-2"
            :placeholder="profil.prezime"
            id="prezime"
          />
        </div>
        <button type="submit" class="btn btn-primary ml-2">Izmjeni</button>
      </form>
      Recepti koje prati:
      <div v-for="recept in praceno" v-bind:key="recept.id" class="col-3">
        <router-link v-bind:to="'/recept/' + recept.id">{{
          recept.naziv
        }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store.js";
import { db } from "@/firebase";

export default {
  data() {
    return {
      store,
      profil: {},
      praceno: [],
      ime: "",
      prezime: "",
    };
  },
  methods: {
    Profil() {
      db.collection("Profil")
        .doc(store.currentUser)
        .set({
          ime: this.ime,
          prezime: this.prezime,
        })
        .then(() => {
          location.reload();
        });
    },
    getProfil() {
      if (store.currentUser !== null) {
        db.collection("Profil")
          .doc(store.currentUser)
          .get()
          .then((result) => {
            let data = result.data();
            let card = {
              ime: data.ime,
              prezime: data.prezime,
            };
            this.profil = card;
          });
      }
    },
    getRecept() {
      if (store.currentUser !== null) {
        db.collection("pero@net.rh")
          .get()
          .then((result) => {
            result.forEach((doc) => {
              let data = doc.data();
              console.log(data);
              let card = {
                id: data.id,
                naziv: data.naziv,
              };
              this.praceno.push(card);
            });
            console.log(this.praceno);
          });
      }
    },
  },
  mounted() {
    this.getProfil();
    this.getRecept();
  },
};
</script>