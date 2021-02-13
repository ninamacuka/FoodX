<template>
  <div class="noviRecept">
    <div class="container mt-3">
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6">
          <form @submit.prevent="NoviRecept" class="mb-5">
            <div class="form-group mb-3">
              <label for="naziv">Naziv</label>
              <input
                v-model="naziv"
                type="text"
                class="form-control"
                placeholder="Naziv"
                id="naziv"
              />
            </div>
            <div
              class="form-group"
              v-for="(sastojak, index) in sastojci"
              :key="index"
            >
              <div class="form-group text-danger">
                <label>Sastojak: </label>
                <input
                  v-model="sastojci[index].sastojak"
                  :name="`sastojci[${index}][sastojak]`"
                  type="text"
                  class="form-control"
                  placeholder="Sastojak"
                />
              </div>
              <div class="form-group text-danger">
                <label>Količina: </label>
                <input
                  v-model="sastojci[index].kolicina"
                  :name="`sastojci[${index}][kolicina]`"
                  type="text"
                  class="form-control"
                  placeholder="Kolicina"
                />
              </div>
            </div>
            <div class="form-group">
              <button
                @click="addSastojak"
                type="button"
                class="btn btn-secondary"
              >
                Novi Sastojak
              </button>
            </div>
            <div class="form-group">
              <label>Priprema:</label>
              <textarea
                v-model="priprema"
                type="textarea"
                class="form-control"
                placeholder="Priprema"
              />
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary ml-2">
                Dodaj Recept
              </button>
            </div>
          </form>
        </div>
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
      naziv: "",
      sastojci: [
        {
          sastojak: "",
          kolicina: "",
        },
      ],
      priprema: "",
    };
  },
  methods: {
    NoviRecept() {
      db.collection("Recepti")
        .add({
          naziv: this.naziv,
          email: store.currentUser,
          status: false,
          posted_at: Date.now(),
          sastojci: this.sastojci,
          priprema: this.priprema,
        })
        .then(() => {
          this.$router.replace({ name: "Home" });
        });
    },
    addSastojak() {
      this.sastojci.push({
        sastojak: "",
        kolicina: "",
      });
    },
  },
};
</script>