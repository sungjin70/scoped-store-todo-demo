<template>
<div>
  <to-do-filter />
  <v-sheet
    class="fill-height overflow-hidden"
    style="position: relative;"
  >
  <v-container class="fill-height">
    <v-row class="mb-6">
      <v-col >
        <v-card class="elevation-12">
            <v-toolbar dark color="gray lighten-2">
              <v-toolbar-title>Todos</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <ToDoList :done="false" />
            </v-card-text>
        </v-card>
      </v-col>
      <v-col >

        <v-card class="elevation-12">
            <v-toolbar dark color="blue lighten-1">
              <v-toolbar-title>Todos Done</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <ToDoList :done="true" />
            </v-card-text>
        </v-card>

      </v-col>
      <v-col md="auto">
        <v-navigation-drawer
          v-model="showEdit"
          right
          :permanent="showEdit"
        >
          <ToDoDetail  />

          <v-divider></v-divider>

        </v-navigation-drawer>
      </v-col>
    </v-row>
  </v-container>

  </v-sheet>

  <!-- <v-btn color="primary" @click="setTodosWithDefault()">setTodosWithDefault</v-btn>
  <br />
  {{todos}} -->

</div>
  
 
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ToDoList from '../components/ToDoList.vue';
import ToDoFilter from '../components/ToDoFilter.vue';
import ToDoDetail from '../components/ToDoDetail.vue';
import { GlobalStore, GlobalStoreReceived } from 'vue-scoped-store';
import Todo from '../models/todo';

@Component({
  components: {
    ToDoList,
    ToDoFilter,
    ToDoDetail
  },
})
export default class Home extends Vue {

  @GlobalStore()
  private showEdit = false;

  @GlobalStore()
  private todos : Array<Todo> | null = null;

  @GlobalStore()
  private selectedTodoId = -1;

  @GlobalStoreReceived('selectedTodoId') 
  onSelectedTodoIdReceived(val:any): void {
    console.log('onSelectedTodoIdReceived', val);
    if (this.selectedTodoId !== -1)
      this.showEdit = true;
  }

  @GlobalStoreReceived('todos') 
  onTodosReceived(val:any): void {
    console.log('onTodosReceived', val);
  }


  created(): void {
    // console.log('created()', this.todos);
    if (this.todos == null)
      this.setTodosWithDefault();  
  }

  setTodosWithDefault() : void {
    this.todos = [
      {
        id:1,
        title:'Todo 1',
        isDone:false,
        isPrivate:true
      },
      {
        id:2,
        title:'Todo 2',
        isDone:true
      },
      {
        id:3,
        title:'Todo 3',
        isDone:false,
        isBusiness:true
      },
      {
        id:4,
        title:'Todo 4',
        isDone:true,
        isBusiness:true,
        isPrivate:true,
      }
    ];

    console.log('setTodosWithDefault()', this.todos);
  }
}
</script>
