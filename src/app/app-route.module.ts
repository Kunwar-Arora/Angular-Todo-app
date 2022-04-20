import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodoDetailsComponent } from "./todos/todo-details/todo-details.component";
import { TodoEditComponent } from "./todos/todo-edit/todo-edit.component";
import { TodosComponent } from "./todos/todos.component";

const appRoutes: Routes = [
  {path:'', redirectTo:'/todos', pathMatch:'full'},
  {path:'todos', component:TodosComponent , children:[
    {path:'new', component:TodoEditComponent},
    {path:':id', component:TodoDetailsComponent},
    {path:':id/edit', component: TodoEditComponent}
  ]}
];
@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutes{}
