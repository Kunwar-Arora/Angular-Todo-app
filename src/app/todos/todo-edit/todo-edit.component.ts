import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit, OnDestroy {

  todoForm!: FormGroup;
  id!: number;
  editMode: boolean = false;
  subscription!: Subscription;

  existingTodosNames: string[] = [];
  constructor(private activeRoute: ActivatedRoute, private todosService: TodosService, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.activeRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.existingTodosNames = this.todosService.getExistingTodosNames();
      this.formInit();
    });
  };
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  formInit(){
    let todoName = '';
    let todoDetails = '';
    let todoStatus = 'not-done';

    if(this.editMode){
      const todo = this.todosService.getItemById(this.id);
      todoName = todo.name;
      todoDetails = todo.details;
      todoStatus = todo.status;
    }


    this.todoForm = new FormGroup({
      'name': new FormControl(todoName, [Validators.required, this.existingTodoNames.bind(this)]),
      'details':new FormControl(todoDetails, Validators.required),
      'status':new FormControl(todoStatus)
    })
  };


  // Forbidding users to enter existing todos again
  existingTodoNames(control:FormControl):{[key:string]: boolean} | null {
    if(!this.editMode){
      return this.existingTodosNames.indexOf(control.value) !== -1 ? {'TaskAlreayExist': true} : null;
    }
    return null;
  };

  submit(){
    if(this.editMode){
      this.todosService.changeTodo(this.id, this.todoForm.value);
    }
    else{
      this.todosService.addNewTodo(this.todoForm.value);
    };
    this.cancel();
  }


  cancel(){
    this.subscription.unsubscribe();
    this.router.navigate(['../'], {relativeTo: this.activeRoute})
  };
}
