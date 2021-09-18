import Todo from "./todo";

export interface Filter {
    search: string;
    category: {
      isBusiness: boolean;
      isPrivate: boolean;
    };
}

export function filterTodos(todos:Array<Todo>, filter:Filter) : Array<Todo> {
    return todos.filter(item => {
        return (
            (!item.title || !filter.search || item.title.toUpperCase().indexOf(filter.search.toUpperCase()) > -1) &&
            (filter.category && filter.category.isBusiness ? item.isBusiness : true) &&
            (filter.category && filter.category.isPrivate ? item.isPrivate : true)
        );
      });
}
