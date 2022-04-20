import { Subject } from "rxjs";
import { Todo } from "./todo.model";

export class TodosService{
  constructor(){}
  private todos: Todo[] = [
    new Todo(
      'Breakfast',
      'eat breakfast',
      'not-done'
    ),
    new Todo(
      'Study',
      'study Angular',
      'not-done'
    ),
    new Todo(
      'Lunch',
      'eat Lunch',
      'not-done'
    )
  ];

  changedTodos = new Subject<Todo[]>();


  getTodos(){
    return this.todos.slice();
  };

  getItemById(index:number){
    return this.todos[index];
  };

  changeStatus(index:number){
    this.todos[index].status === 'not-done' ? 'done' : 'not-done';
    this.changedTodos.next(this.todos.slice());
  };

  deleteTodo(index:number){
    this.todos.splice(index, 1);
    this.changedTodos.next(this.todos.slice())
  }

  getExistingTodosNames(){
    let existingNames = this.todos.slice().map((item) => item.name);
    return existingNames;
  };

  addNewTodo(newTodo: Todo){
    this.todos.push(newTodo);
    this.changedTodos.next(this.todos.slice());
  };

  changeTodo(index:number, todo: Todo ){
    this.todos[index] = todo;
    this.changedTodos.next(this.todos);
  }
}
