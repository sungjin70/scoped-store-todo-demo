<template>
<v-container >
    <v-toolbar height="70px" flat dark color="secondary" >
      <v-toolbar-title>Search</v-toolbar-title>

      <v-text-field
          placeholder="title"
          hide-details
          light
          solo
          v-model="filter.search"
          class="ml-6" 
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
      <v-spacer></v-spacer>
      <v-btn @click="selectedTodoId = -2">
        Add to-do
      </v-btn>
    </v-toolbar>
</v-container>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { GlobalStore } from 'vue-scoped-store';
import Filter from '@/models/filter';

/**
 * to-do 검색 툴바 컴포넌트
 * 
 * A component that serve a search toolbar
*/
@Component
export default class extends Vue {
  /**
   * 선택된 ToDo의 ID.
   * selectedTodoId에 설정하는 -1은 변수 값을 공유할 수 있도록하기 위해 필요하다.
   * 
   * ID of a selected to-do.
   * The -1 assigned to selectedToId is necessary to share the variable value.
  */
  @GlobalStore()
  private selectedTodoId = -1;

  /**
   * todos를 필터링하기 위한 조건.
   * 
   * @GlobalStore의 인자인 {deep:true}는 filter의 중첩된 속성의 변화를 감지하도록 하기위해 필요하다.
   * ScopedStore는 속성값 변화를 감지하기 위해 Vue의 watch옵션을 이용하고 deep 인자 또한 watch로 넘겨주기 위한 것이다.
   * 따라서, {deep:true}가 필요한 이유를 정확히 이해하려면 watch에 관련된 문헌을 참고하면된다.
   * https://ui.toast.com/weekly-pick/ko_20190307
   * 
   * 
   * The parameter deep of @GlobalStore is for detecting changes in any nested properties of the filter.
   * Internally, ScopedStore uses Vue's watch option to detect changes in any property values, 
   * and the deep parameter is just handed over to watch.
   * Therefore, to understand in more detail what the deep parameter does, 
   * refer to a literature related to the watch option.
   * https://michaelnthiessen.com/how-to-watch-nested-data-vue/
  */
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