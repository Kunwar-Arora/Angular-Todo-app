import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Todo } from '../todo.model';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit, OnDestroy {

  todos: Todo[] = []
  subscription!: Subscription;
  constructor(private todosService: TodosService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.todosService.changedTodos.subscribe((todos: Todo[]) => {
      this.todos = todos;
    })
    this.todos =  this.todosService.getTodos();
  };
  addNewTodo(){
    this.router.navigate(['new'], {relativeTo: this.activeRoute});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
