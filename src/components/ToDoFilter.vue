<template>
<v-container >
    <v-toolbar height="70px" flat dark color="secondary" >
      <v-toolbar-title>Todo</v-toolbar-title>

      <v-btn class="ml-10" @click="selectedTodoId = -2">
        Add Todo
      </v-btn>      

      <v-spacer></v-spacer>

      <v-text-field
          placeholder="title"
          hide-details
          light
          solo
          v-model="filter.search"
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