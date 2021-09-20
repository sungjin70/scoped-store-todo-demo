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

/**
 * ToDo 페이지 컴포넌트.
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
   * 속성에 @GlobalStore 데코래이터를 달아주면 해당 속성 값은 전역으로 공유된다.
   * 
   * 속성 변수들이 선언되는 시점에 설정되는 초기 값은 어플리케이션 전역으로 공유되지 않는다는 
   * 특징은 ScopedStore를 사용하기 위해 이해야하는 중요한 포인트다.
   * 하지만, 속성변수 선언 시점에 의미 없는 값이라도 설정을 해야한다.
   * Vue에서는 속성 선언시에 어떤 값이든 설정을 해야 해당 속성이 반응형이 되기 때문이다.
  */

  /**
   * ToDoDetail 컴포넌트를 화면에 보여주는지 여부.
   * 
   * showEdit에 설정하는 false값은 향후 변수 값을 공유할 수 있도록하기 위해 필요하다.
  */
  @GlobalStore()
  private showEdit = false; 

  /**
   * 선택된 ToDo의 ID.
   * 
   * selectedTodoId에 설정하는 -1은 향후 변수 값을 공유할 수 있도록하기 위해 필요하다.
  */
  @GlobalStore()
  private selectedTodoId = -1;

  /**
   * ToDo 목록
   * 
   * todos에 설정하는 null값은 향후 변수 값을 공유할 수 있도록하기 위해 필요하다.
  */
  @GlobalStore()
  private todos : Array<Todo> | null = null;

  /**
   * @GlobalStoreReceived로 데코레이션된 메소드는 
   * 관련 변수가 새 값을 수신한 이후 호출되는 콜백이다.
   * 
   * 여기에서는 selectedTodoId가 변경될 때 showEdit를 true로 설정해 
   * ToDoDetail 컨트롤이 화면에 나타나도록 제어하는데 @GlobalStoreReceived가 사용되었다.
  */
  @GlobalStoreReceived('selectedTodoId') 
  onSelectedTodoIdReceived(val:any): void {
    console.log('onSelectedTodoIdReceived', val);
    if (this.selectedTodoId !== -1)
      this.showEdit = true;
  }

  created(): void {

    /**
     * Vue 컴포넌트의 created 단계부터는 @GlobalStore로 
     * 장식된 속성의 값이 변경되면 전역으로 전파된다.
    */
    if (this.todos == null)
      //todos에 설정한 값은 어플리케이션 전역적으로 공유된다.
      this.setTodosWithDefault();  
  }

  /**
   * todos속성 배열에 기본 샘플 값을 설정함.
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
