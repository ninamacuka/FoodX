<template>
  <div class="container mt-4">
    <div class="row">
      <div class="m-auto">
        <div class="card mb-5" style="width: 50rem">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">{{ Recepti.naziv }}</li>
            <li class="list-group-item bg-primary">Sastojci:</li>
            <li
              v-for="sastojak in Recepti.sastojci"
              v-bind:key="sastojak.id"
              class="list-group-item border-0"
            >
              {{ sastojak.sastojak }} : {{ sastojak.kolicina }}
            </li>
            <li class="list-group-item bg-success">Priprema:</li>
            <li class="list-group-item">{{ Recepti.priprema }}</li>
          </ul>
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
      Recepti: {},
      store,
      id: this.$route.params.id,
    };
  },
  methods: {
    getRecepti() {
      db.collection("Recepti")
        .doc(this.id)
        .get()
        .then((result) => {
          let data = result.data();
          let card = {
            id: result.id,
            naziv: data.naziv,
            time: data.posted_at,
            sastojci: data.sastojci,
            priprema: data.priprema,
          };
          console.log(card);
          this.Recepti = card;
          console.log(this.Recepti);
        });
    },
  },
  mounted() {
    this.getRecepti();
  },
};
</script>
