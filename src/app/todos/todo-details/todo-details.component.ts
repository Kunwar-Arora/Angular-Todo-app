import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Todo } from '../todo.model';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  todoItem!:Todo;
  id!:number;
  subscription!: Subscription;
  constructor(private activeRoute: ActivatedRoute, private todosService: TodosService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.activeRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.todoItem = this.todosService.getItemById(this.id);
      }
    );

  };
  changeStatus(){
    this.todosService.changeStatus(this.id);
    switch(this.todoItem.status){
      case 'not-done':
        this.todoItem.status = 'done';
        break;
      case 'done':
        this.todoItem.status = 'not-done';
        break;
      default:
        break;
    };
  };

  editTodo(){
    this.router.navigate(['edit'], {relativeTo:this.activeRoute});
  };

  deleteTodo(){
    this.todosService.deleteTodo(this.id);
    this.router.navigate(['../'], {relativeTo: this.activeRoute})
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
