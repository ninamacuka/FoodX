<template>
  <div class="container">
    <div class="row">
      <div class="col-3">
        <div class="card m-1">
          <img class="card-img-top" src="" style="width: 100%" alt="" />
          <div class="card-body">
            <h5 class="card-title">{{ Recepti.naziv }}</h5>
            <h5
              v-for="sastojak in Recepti.sastojci"
              v-bind:key="sastojak.id"
              class="card-title"
            >
              {{ sastojak.sastojak }} :
              {{ sastojak.kolicina }}
            </h5>
            <button
              class="btn btn-danger float-right"
              @click="onDelete(Recepti.id)"
            >
              X
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
      Recepti: {},
      store,
      id: this.$route.params.id,
    };
  },
  methods: {
    getRecepti() {
      let Recepti = [];
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
