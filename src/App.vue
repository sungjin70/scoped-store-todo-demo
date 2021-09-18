<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">

      <h1 >
        ScopedStore
      </h1>
      </div>
      <v-btn class="ml-12" text to="/">ToDos</v-btn>
      <v-btn class="ml-2" text to="/about">About</v-btn>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/sungjin70/vue-scoped-store"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
});
</script>
