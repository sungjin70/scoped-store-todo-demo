<template>

    <ul>
        <li v-for="(todo, i) in todoList"
            :key="i"
            :class="{ active: selectedTodoId === todo.id }"
            class="transition-swing text-subtitle-1"
            @click="selectedTodoId = todo.id">
            {{ todo.title }} 
            <v-spacer></v-spacer>
            <v-chip
                v-if="todo.isBusiness"
                class="ma-2 text-subtitle-3"
                color="green"
                text-color="white"
                >
                Business
            </v-chip>
            <v-chip
                v-if="todo.isPrivate"
                class="ma-2 text-subtitle-3"
                color="secondary"
                text-color="white"
                >
                Private
            </v-chip>
        </li>
    </ul>

</template>

<script lang="ts">
import { Filter, filterTodos } from '@/models/filter';
import { Component, Vue, Prop } from 'vue-property-decorator';
import {GlobalStore, GlobalStoreBeforeReceive} from 'vue-scoped-store';
import Todo from '../models/todo';

@Component
export default class extends Vue {

    @Prop()
    private done! : boolean;

    @GlobalStore()
    private todos : Array<Todo> = [];

    @GlobalStore()
    private selectedTodoId = -1;

    @GlobalStore({deep:true})
    private filter: Filter = {} as Filter;

    get todoList() : Array<Todo> {
        const showDone = this.done;
        let todos = filterTodos(this.todos, this.filter).filter(t => t.isDone === showDone);
        return todos;
    }

    // @GlobalStoreBeforeReceive('selectedTodoId')
    // onBeforeSelectedTodoIdChange(val:any, oldVal:any, options:{proceed:boolean}): void {
    //     console.log('onBeforeSelectedTodoIdChange in ToDoList.vue', val, oldVal, options);
    // }

}
</script>

<style scoped>
ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
    width: 100%;
}

li {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 40px;
    padding-left: 8px;
    cursor: pointer;
}

li.active {
    background-color: rgb(226, 226, 236);
}
</style>