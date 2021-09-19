<template>
    <v-card class="elevation-12">
        <v-toolbar dark :color="selectedTodoId >= 0 ? 'red lighten-1':'pink lighten-1'">
            <v-toolbar-title>{{ selectedTodoId >= 0 ? 'Edit Todo' : 'Create Todo' }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="close()" >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card-text>
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
            >
                <v-text-field
                    v-model="todo.title"
                    :counter="20"
                    :rules="titleRules"
                    label="title"
                    required
                ></v-text-field>
                <v-checkbox
                    v-model="todo.isDone"
                    label="Is this todo done?"
                ></v-checkbox>
                <v-checkbox
                    v-model="todo.isPrivate"
                    label="Private"
                ></v-checkbox>
                <v-checkbox
                    v-model="todo.isBusiness"
                    label="Business"
                ></v-checkbox>
                <v-btn
                    color="success"
                    class="mr-4"
                    @click="save()"
                >
                Save
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { GlobalStore, GlobalStoreReceived, GlobalStoreBeforeSend } from 'vue-scoped-store';
import Todo from '@/models/todo';
import {Filter, filterTodos } from '@/models/filter';

@Component
export default class Home extends Vue {

    @GlobalStore()
    private showEdit = false;

    @GlobalStore()
    private todos : Array<Todo> = [];

    @GlobalStore()
    private selectedTodoId = -1;

    private valid = true;
    private todo : any = {};

    private titleRules = [
        (v: any) => !!v || 'Name is required',
        (v: any) => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ];

    @GlobalStore({deep:true})
    private filter: Filter = {} as Filter;

    @GlobalStoreReceived('todos') 
    onTodosReceived(val:any): void {
        console.log('onTodosReceived()', val);
        this.todo = this.getEditTodo();
    }

    @GlobalStoreReceived('selectedTodoId') 
    onSelectedTodoIdReceived(val:any): void {
        console.log('onSelectedTodoIdReceived()', val);
        this.todo = this.getEditTodo();
    }

    // @GlobalStoreReceived('selectedTodoId') 
    // onSelectedTodoIdReceived(val:any): void {
    //     console.log('onSelectedTodoIdReceived()', val);
    //     this.todo = this.getEditTodo();
    // }

    getEditTodo() {
        let todos = filterTodos(this.todos, this.filter);
        const idx = todos.findIndex(t => t.id === this.selectedTodoId);

        let todo = null;
        if (idx != -1)
            todo = {...todos[idx]};
        else
            todo = {};

        return todo;
    }

    get selectedTodo() : any {
        const idx = this.todos.findIndex(t => t.id === this.selectedTodoId);
        if (idx != -1)
            return {...this.todos[idx]};
        else
            return {};
    }


    save() : void {
        const isValid = this.$refs.form.validate();

        console.log('save()', isValid);
        if (isValid) {
            if (this.selectedTodoId >= 0) {
                const idx = this.todos.findIndex(t => t.id === this.selectedTodoId);
                this.todos[idx] = {...this.todo};
            }
            else {
                const newId = this.todos[this.todos.length-1].id + 1;
                this.todo.id = newId;
                this.todo.isDone = !!this.todo.isDone;
                this.todos.push({...this.todo});
                this.selectedTodoId = newId;
            }

            this.todos = [...this.todos];
            // this.close();

            console.log('save()', this.todos, this.todo);
        }

    }

    close(): void {
        console.log('close()');
        this.showEdit = false;
    }

}
</script>
