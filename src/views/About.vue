
<template>
  <div class="about">

  <v-container class="fill-height">
    <v-row>
      <v-col >
        <h2 class="headline font-weight-bold mb-3">
          You can see all states that managed by ScopedStore here.
        </h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col >
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Value
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td >todos:</td>
          <td>{{todos}}</td>
        </tr>
        <tr>
          <td >selectedTodoId:</td>
          <td>{{selectedTodoId}}</td>
        </tr>
        <tr>
          <td >showEdit:</td>
          <td>{{showEdit}}</td>
        </tr>
        <tr>
          <td >filter:</td>
          <td>{{filter}}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>

      </v-col>
    </v-row>
  </v-container>

  </div>
</template>

<script lang="ts">
import { Filter } from '@/models/filter';
import Todo from '@/models/todo';
import { Component, Vue } from 'vue-property-decorator';
import { GlobalStore } from 'vue-scoped-store';

@Component
export default class Home extends Vue {
  @GlobalStore()
  private showEdit = false;

  @GlobalStore()
  private todos : Array<Todo> | null = null;

  @GlobalStore()
  private selectedTodoId = -1;

  @GlobalStore({deep:true})
  private filter: Filter = {} as Filter;

  // created() : void {

  // }
}
</script>
