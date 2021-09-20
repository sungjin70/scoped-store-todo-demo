<template>
<v-container >
    <v-toolbar height="70px" flat dark color="secondary" >
      <v-toolbar-title>Search</v-toolbar-title>

      <v-text-field
          placeholder="title"
          hide-details
          light
          solo
          v-model="filter.search"
          class="ml-6" 
      ></v-text-field>
      <v-checkbox
          label="Private"
          hide-details
          class="ml-4"
          v-model="filter.category.isPrivate"
      ></v-checkbox>
      <v-checkbox
          label="Business"
          hide-details
          class="ml-2"
          v-model="filter.category.isBusiness"
      ></v-checkbox>
      <v-spacer></v-spacer>
      <v-btn @click="selectedTodoId = -2">
        Add Todo
      </v-btn>
    </v-toolbar>
</v-container>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { GlobalStore } from 'vue-scoped-store';
import { Filter } from '../models/filter'

@Component
export default class Home extends Vue {
  @GlobalStore()
  private selectedTodoId = -1;

  @GlobalStore({deep:true})
  private filter: Filter = { 
    search: '',
    category: {
      isBusiness: false,
      isPrivate: false
    }
   };

}
</script>

<style scoped>

/deep/ .v-text-field{
  width: 150px;
}

</style>