<template>
  <div class="container">
    <div class="row">
      <div v-for="recept in Recepti" v-bind:key="recept.id" class="col-3">
        <div class="card m-1">
          <img class="card-img-top" src="" style="width: 100%" alt="" />
          <div class="card-body">
            <h5 class="card-title">{{ recept.email }}</h5>
            <h5 class="card-title">{{ recept.naziv }}</h5>
            <h5
              v-for="sastojak in recept.sastojci"
              v-bind:key="sastojak.id"
              class="card-title"
            >
              {{ sastojak.sastojak }} :
              {{ sastojak.kolicina }}
            </h5>
            <router-link v-bind:to="'/recept/' + recept.id"
              >Pregledaj</router-link
            >
            <button
              v-if="recept.status === false"
              class="btn btn-danger float-right"
              @click="getPotvrdi(recept)"
            >
              Potvrdi
            </button>
            <button
              v-else
              class="btn btn-danger float-right"
              @click="getUkloni(recept)"
            >
              Ukloni
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store.js";
import { db } from "@/firebase";

export default {
  name: "home",
  data: function () {
    return {
      Recepti: [],
      store,
    };
  },
  methods: {
    getRecepti() {
      console.log("Loading posts");
      db.collection("Recepti")
        .orderBy("posted_at", "desc")
        .limit(100)
        .get()
        .then((results) => {
          results.forEach((doc) => {
            let id = doc.id;
            let data = doc.data();
            let card = {
              id: doc.id,
              naziv: data.naziv,
              time: data.posted_at,
              sastojci: data.sastojci,
              email: data.email,
              status: data.status,
            };
            this.Recepti.push(card);
          });
        });
    },
    getPotvrdi(recept) {
      db.collection("Recepti")
        .doc(recept.id)
        .update({
          status: true,
        })
        .then(() => {
          location.reload();
        });
    },
    getUkloni(recept) {
      db.collection("Recepti")
        .doc(recept.id)
        .update({
          status: false,
        })
        .then(() => {
          location.reload();
        });
    },
  },
  mounted() {
    this.getRecepti();
  },
};
</script>
