export default interface Todo {
    id: number;
    title: string;
    isDone: boolean;
    isBusiness?: boolean;
    isPrivate?: boolean;
}
  