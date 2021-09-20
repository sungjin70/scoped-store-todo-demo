/**
 * Todo 형식 정의
 * 
 * Type definition of Todo
 */
export default interface Todo {
    id: number;
    title: string;
    isDone: boolean;
    isBusiness?: boolean;
    isPrivate?: boolean;
}