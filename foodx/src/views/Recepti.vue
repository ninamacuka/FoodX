<template>
  <div class="container">
    <input type="text" v-model="trazi" placeholder="pretraži recepte" />
    <div class="row mt-3">
      <div class="m-auto">
        <div v-for="recept in search" v-bind:key="recept.id">
          <div v-if="recept.status === true">
            <div class="card mb-5" style="width: 50rem">
              <ul class="list-group list-group-flush">
                <li class="list-group-item">{{ recept.naziv }}</li>
                <li class="list-group-item bg-primary">Sastojci:</li>
                <li
                  v-for="sastojak in recept.sastojci"
                  v-bind:key="sastojak.id"
                  class="list-group-item border-0"
                >
                  {{ sastojak.sastojak }} : {{ sastojak.kolicina }}
                </li>
                <li class="list-group-item bg-success">Priprema:</li>
                <li class="list-group-item">{{ recept.priprema }}</li>
              </ul>
              <div class="list-group-item">
                <router-link
                  class="btn btn-danger mr-3"
                  v-bind:to="'/recept/' + recept.id"
                  >Pregledaj</router-link
                >
                <button class="btn btn-danger" @click="getPrati(recept)">
                  Prati
                </button>
              </div>
            </div>
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
      trazi: "",
      store,
    };
  },
  methods: {
    getRecepti() {
      console.log("Loading posts");
      db.collection("Recepti")
        .orderBy("posted_at", "desc")
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
              status: data.status,
              priprema: data.priprema,
            };
            this.Recepti.push(card);
          });
        });
    },
    getPrati(recept) {
      db.collection(store.currentUser)
        .add({
          id: recept.id,
          naziv: recept.naziv,
        })
        .then(() => {
          location.reload();
        });
    },
  },
  mounted() {
    this.getRecepti();
  },
  computed: {
    search: function () {
      return this.Recepti.filter((item) => {
        return item.naziv.toLowerCase().match(this.trazi.toLowerCase());
      });
    },
  },
};
</script>
