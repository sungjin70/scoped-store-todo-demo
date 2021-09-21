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
          <ToDoList :done="false" />
        </v-card>
      </v-col>
      <v-col >
        <v-card class="elevation-12">
          <ToDoList :done="true" />
        </v-card>
      </v-col>
      <v-col md="auto">
        <v-navigation-drawer
          v-model="showEdit"
          :permanent="showEdit"
          right
        >
          <ToDoDetail  />
          <v-divider></v-divider>
        </v-navigation-drawer>
      </v-col>
    </v-row>
  </v-container>

  </v-sheet>

  <!-- <v-btn @click="setTodosWithDefault()">setTodosWithDefault</v-btn>
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

/**
 * to-do 페이지 컴포넌트.
 * 
 * A component that allows users to manage their to-do lists, which serve as a page.
*/
@Component({
  components: {
    ToDoList,
    ToDoFilter,
    ToDoDetail
  },
})
export default class extends Vue {

  /**
   * 속성에 @GlobalStore 데코레이터를 달아주면 해당 속성은 ScopedStore에 의해 관리되고 속성 값은 전역으로 공유된다.
   * 
   * 속성이 선언되는 시점에 설정되는 초기 값은 어플리케이션 전역으로 공유되지 않는다는 
   * 특징은 ScopedStore를 사용하기 위해 이해야하는 중요한 포인트다.
   * 하지만, 속성변수 선언 시점에 의미 없는 값이라도 설정을 해야한다.
   * Vue에서는 속성 선언 시에 undefined를 제외한 어떤 값이든 설정해야 속성이 반응형이 되기 때문이다.
   * 
   * If you decorate a property with a @GlobalStore, the property's value is managed by ScopedStore and shared globally.
   * 
   * A initial value assigned at declaring a property is not shared to others, 
   * this is something important that you have to understand in order to use the ScopedStore.
   * Even though the initial values are not shared, every properties have to have their initial values.
   * This is because in order to make a property reactive in Vue, you must set 
   * any value except 'undefined' when declaring the property.
  */

  /**
   * ToDoDetail 컴포넌트를 화면에 보여주는지 여부.
   * showEdit에 설정하는 false값은 향후 변수 값을 공유할 수 있도록하기 위해 필요하다.
   * 
   * A variable whether ToDoDetail component is displayed on the screen.
   * The false value assigned to showEdit is necessary to share the variable value.
  */
  @GlobalStore()
  private showEdit = false; 

  /**
   * 선택된 to-do의 ID.
   * selectedTodoId에 설정하는 -1은 향후 변수 값을 공유할 수 있도록하기 위해 필요하다.
   * 
   * ID of a selected to-do.
   * The -1 assigned to selectedToId is necessary to share the variable value.
  */
  @GlobalStore()
  private selectedTodoId = -1;

  /**
   * to-do 목록
   * todos에 설정하는 null값은 향후 변수 값을 공유할 수 있도록하기 위해 필요하다.
   * 
   * An array variable of the list of the to-do
   * The null assigned to todos is necessary to share the variable value.
  */
  @GlobalStore()
  private todos : Array<Todo> | null = null;

  /**
   * @GlobalStoreReceived로 데코레이션된 메소드는 
   * 연결된 변수가 새 값을 수신한 이후 호출되는 콜백이다.
   * 
   * Once a method is decorated with @GlobalStoreReceived, 
   * it becomes a callback that is called right after a related variable, 
   * which is selectedTodoId here, receives a new value.
  */
  @GlobalStoreReceived('selectedTodoId') 
  onSelectedTodoIdReceived(val:any): void {
    console.log('onSelectedTodoIdReceived', val);
    /**
     * selectedTodoId가 변경될 때 showEdit를 true로 설정해 
     * ToDoDetail 컨트롤이 화면에 나타나도록 한다.
     * 
     * When selectedToId is changed, showEdit is set to true 
     * so that ToDoDetail control pops in on the screen.
    */
    if (this.selectedTodoId !== -1)
      this.showEdit = true;
  }

  created(): void {
    /**
     * Vue 컴포넌트의 created 단계부터는 @GlobalStore로 장식된 속성이 변경되면 전역으로 전파된다.
     * 좀더 정확히, created부터 beforeDestory전 단계 범위에서 발생한 변경 데이터는 모두 공유된다.
     * https://kr.vuejs.org/v2/guide/instance.html#라이프사이클-다이어그램
     * 
     * From the created stage of the Vue component, 
     * every time a property managed by ScopedStore is changed, it propagates globally.
     * More accurately, all changes happened in the range of the steps from created to before BeforeDestory will be shared.
     * https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram
    */
    if (this.todos === null)
      //todos에 설정한 값은 어플리케이션 전역적으로 공유된다.
      //The value set in todos is shared throughout the application.
      this.setTodosWithDefault();  
  }

  /**
   * todos속성 배열에 기본 샘플 값을 설정함.
   * 
   * Sets the example value in the todos property array.
  */
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
