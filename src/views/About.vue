
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
import Filter from '@/models/filter';
import Todo from '@/models/todo';
import { Component, Vue } from 'vue-property-decorator';
import { GlobalStore } from 'vue-scoped-store';

/**
 * About 페이지 컴포넌트.
 * 이 컴포넌트는 어플리케이션에서 사용되는 모든 전역 변수들의 값을 테이블 형식으로 출력한다.
*/
@Component
export default class extends Vue {

  /**
   * 속성에 @GlobalStore 데코래이터를 달아주면 해당 속성 값은 전역으로 공유된다.
   * 
   * 이 컴포넌트 안에서는 속성들의 값을 직접 수정하지 않는다.
   * 다른 곳에서 같은 이름의 속성에 설정된 값들을 여기서는 보여주기만 한다.
   * 각 속성변수들을 선언할 때 의미없는 값이지만 반드시 설정해줘야 변수간 공유가 동작한다.
  */

  /**
   * showEdit에 설정하는 false값은 속성 값을 공유할 수 있도록하기 위해 필요하다.
  */
  @GlobalStore()
  private showEdit = false;

  /**
   * todos에 설정하는 null값은 속성 값을 공유할 수 있도록하기 위해 필요하다.
  */
  @GlobalStore()
  private todos : Array<Todo> | null = null;

  /**
   * selectedTodoId에 설정하는 -1값은 속성 값을 공유할 수 있도록하기 위해 필요하다.
  */
  @GlobalStore()
  private selectedTodoId = -1;

  /**
   * filter에 설정하는 {}값은 속성 값을 공유할 수 있도록하기 위해 필요하다.
  */
  @GlobalStore()
  private filter: Filter = {} as Filter;

}
</script>
