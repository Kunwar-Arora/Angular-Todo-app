import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TodosComponent } from './todos/todos.component';
import { TodosListComponent } from './todos/todos-list/todos-list.component';
import { TodoItemComponent } from './todos/todos-list/todo-item/todo-item.component';
import { TodoDetailsComponent } from './todos/todo-details/todo-details.component';
import { TodosService } from './todos/todos.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutes } from './app-route.module';
import { TodoEditComponent } from './todos/todo-edit/todo-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodosComponent,
    TodosListComponent,
    TodoItemComponent,
    TodoDetailsComponent,
    TodoEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutes,
    ReactiveFormsModule
  ],
  providers: [TodosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
