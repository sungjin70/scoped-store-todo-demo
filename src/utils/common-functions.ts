import Todo from "../models/todo";
import Filter from "../models/filter";

/**
 * 'todos' 배열을 'filter'값에 의해 필터링하는 함수
 * 
 * A function that filters the 'todos' array by 'filter' value.
 */
export function filterTodos(todos:Array<Todo>, filter:Filter) : Array<Todo> {
    return todos.filter(item => {
        return (
            (!item.title || !filter.search || item.title.toUpperCase().indexOf(filter.search.toUpperCase()) > -1) &&
            (filter.category && filter.category.isBusiness ? item.isBusiness : true) &&
            (filter.category && filter.category.isPrivate ? item.isPrivate : true)
        );
      });
}
