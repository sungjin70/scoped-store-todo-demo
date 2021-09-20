/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { GlobalStore, GlobalStoreReceived } from 'vue-scoped-store';
import Todo from '@/models/todo';
import Filter from '@/models/filter';
import {filterTodos} from '@/utils/common-functions';

/**
 * 새 ToDo추가 또는 선택된 ToDo를 편집하는 컴포넌트
*/
@Component
export default class extends Vue {

  /**
   * ToDoDetail 컴포넌트를 화면에 보여주는지 여부.
   * 
   * showEdit에 설정하는 false값은 변수 값을 공유할 수 있도록하기 위해 필요하다.
  */
    @GlobalStore()
    private showEdit = false;

  /**
   * ToDo 목록
   * 
   * todos에 설정하는 []값은 변수 값을 공유할 수 있도록하기 위해 필요하다.
   * ToDo.vue의 todos와 초기화 하는 값이 다른 대에는 큰 비밀이 있는 것은 아니다.
   * 여기에서는 TypeScript 문법 상 []를 사용하는 것이 더 편하기 때문인데,
   * 뒤에 나오는 filterTodos함수 인자로 Array<Todo> | null 타입을 사용할 수 없어서다.
  */
    @GlobalStore()
    private todos : Array<Todo> = [];

  /**
   * 선택된 ToDo의 ID.
   * 
   * selectedTodoId에 설정하는 -1은 변수 값을 공유할 수 있도록하기 위해 필요하다.
  */
    @GlobalStore()
    private selectedTodoId = -1;

    private valid = true;
    private todo : any = {};

    //ToDo의 title 입력에 대한 유효성검사 규칙
    private titleRules = [
        (v: any) => !!v || 'Name is required',
        (v: any) => (v && v.length <= 20) || 'Name must be less than 20 characters',
      ];

  /**
   * todos를 필터링하기 위한 조건.
   * 
   * filter에 설정하는 {}은 변수 값을 공유할 수 있도록하기 위해 필요하다.
   * ToDoFilter.vue의 filter에서와는 다르게 @GlobalStore의 인자로 deep를 사용할 필요가 없다.
   * 여기에서 filter의 역할은 ToDoFilter.vue에서 전달되는 값을 수신만하면되기 때문이다.
  */
    @GlobalStore()
    private filter: Filter = {} as Filter;

    // @GlobalStoreReceived('todos') 
    // onTodosReceived(val:any): void {
    //     console.log('onTodosReceived()', val);
    //     this.todo = this.getEditTodo();
    // }

  /**
   * @GlobalStoreReceived로 데코레이션된 메소드는 
   * 관련 속성이 새 값을 수신한 이후 호출되는 콜백이다.
   * 
   * 여기에서는 selectedTodoId가 변경될 때 탬플릿에 바인딩할
   * todo 속성 값을 설정하기 위해 @GlobalStoreReceived가 사용되었다.
  */
    @GlobalStoreReceived('selectedTodoId') 
    onSelectedTodoIdReceived(val:any): void {
        console.log('onSelectedTodoIdReceived()', val);
        //템플릿에서 입력 컴포넌트들의 v-model에 바인딩할 todo 값을 설정함.
        this.todo = this.getEditTodo();
    }

    /**
     * 템플릿에서 입력 컴포넌트들의 v-model에 바인딩할 todo 값을 반환함.
    */
    getEditTodo(): Todo {
        let todos = filterTodos(this.todos, this.filter);
        const idx = todos.findIndex(t => t.id === this.selectedTodoId);

        let todo = null;
        if (idx != -1)
            todo = {...todos[idx]};
        else
            todo = {};

        return todo as Todo;
    }

    /**
     * 이 컴포넌트의 용도가 조회용이라면 이런 getter를(computed) 사용해도 된다. 
     * 
     * If the purpose of this component was for inquiry, a getter could be used like this.
    */
    // get selectedTodo() : Todo {
    //     const idx = this.todos.findIndex(t => t.id === this.selectedTodoId);
    //     if (idx != -1)
    //         return {...this.todos[idx]};
    //     else
    //         return {} as Todo;
    // }

    /**
     * 사용자 입력을 검증한 후 todos로 저장하는 함수
    */
    save() : void {
        //사용자의 입력이 유효한지 확인
        //Check if user's input is valid
        const isValid = (this.$refs.form as any).validate();

        if (isValid) {
            //selectedTodoId 값이 0 이상이면 편집 모드
            if (this.selectedTodoId >= 0) {
                const idx = this.todos.findIndex(t => t.id === this.selectedTodoId);
                //전개 연산자(...)를 이용해 복사한 개채를 설정한다.
                this.todos[idx] = {...this.todo};
            }
            //selectedTodoId 값이 0보다 적으면 추가 모드
            else { 
                const newId = this.todos[this.todos.length-1].id + 1;
                this.todo.id = newId;
                this.todo.isDone = !!this.todo.isDone;
                //전개 연산자(...)를 이용해 복사한 개채를 추가한다.
                this.todos.push({...this.todo});
                //방금 추가한 ToDo로 선택을 변경한다.
                //다른 컴포넌들의 selectedTodoId 값도 동시에 업데이트된다.
                this.selectedTodoId = newId;
            }

            //ScopedStore가 todos의 변경을 인지하고 다른 컴포넌트들의 todos들과 값을 동기화 하도록한다.
            //이 코드로 인해 다른 컴포넌트의 todos배열들에도 마지막에 새 ToDo가 추가된다.
            this.todos = [...this.todos];

            console.log('save()', this.todos, this.todo);
        }
    }

    //본 컴포넌트를 화면에서 닫는다.
    close(): void {
        console.log('close()');
        this.showEdit = false;
    }

}
</script>
