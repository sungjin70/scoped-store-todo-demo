<template>

    <v-card class="elevation-12">
        <v-toolbar dark :color="done ? 'blue lighten-1' : 'gray lighten-2'">
            <v-toolbar-title>Todos Done</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
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
        </v-card-text>
    </v-card>

</template>

<script lang="ts">
import Filter from '@/models/filter';
import {filterTodos} from '@/utils/common-functions';
import { Component, Vue, Prop } from 'vue-property-decorator';
import {GlobalStore} from 'vue-scoped-store';
import Todo from '../models/todo';

/**
 * ToDo 목록 출력 컴포넌트
*/
@Component
export default class extends Vue {
    /**
     * ToDo 완료 전과 후 구분
     * 
     * A variable that distinguish what to do before and after completion.
    */
    @Prop()
    private done! : boolean;

  /**
   * ToDo 목록
   * 
   * todos에 설정하는 []값은 변수 값을 공유할 수 있도록하기 위해 필요하다.
   * ToDo.vue의 todos와 초기화 하는 값이 다른 대에는 큰 비밀이 있는 것은 아니다.
   * 여기에서는 TypeScript 규칙상 []를 사용하는 것이 더 편하기 때문인데,
   * 뒤에 나오는 filterTodos함수 인자로 Array<Todo> | null 타입을 사용할 수 없어서다.
   * 
   * 
   * An array variable of the list of the ToDo
   * 
   * Setting [] value is necessary for todos to be managed by ScopedStore.
   * Here, there is no big secret that the value, which is [], to initialize is different from the todos of ToDo.vue.
   * This is just because it is more convenient for me to use [] when used within this component.
   * It means that what to use as the initial value of the property, it is up to you.
  */
    @GlobalStore()
    private todos : Array<Todo> = [];

  /**
   * 선택된 ToDo의 ID.
   * 
   * selectedTodoId에 설정하는 -1은 변수 값을 공유할 수 있도록하기 위해 필요하다.
   * 
   * 
   * ID of a selected ToDo.
   * 
   * Setting -1 value is necessary for selectedTodoId to be managed by ScopedStore.
  */
    @GlobalStore()
    private selectedTodoId = -1;

  /**
   * todos를 필터링하기 위한 조건.
   * 
   * filter에 설정하는 {}은 변수 값을 공유할 수 있도록하기 위해 필요하다.
   * ToDoFilter.vue의 filter에서와는 다르게 @GlobalStore의 인자로 deep를 사용할 필요가 없다.
   * 여기에서 filter의 역할은 ToDoFilter.vue에서 전달되는 값을 수신만하면되기 때문이다.
   * 
   * 
   * Setting {} value is necessary for filter to be managed by ScopedStore.
   * Unlike in ToDoFilter.vue's filter, there is no need to use deep as a parameter of @GlobalStore.
   * This is because the filter property of here only receives values shared by ToDoFilter.vue
  */
    @GlobalStore()
    private filter: Filter = {} as Filter;

  /**
   * 탬플릿에서 todos를 렌더링하는데 필요한 배열을 반환하는 getter.
   * 
   * Returns a array value to render a list of the todo in the template.
  */
    get todoList() : Array<Todo> {
        const showDone = this.done;
        let todos = filterTodos(this.todos, this.filter).filter(t => t.isDone === showDone);
        return todos;
    }
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