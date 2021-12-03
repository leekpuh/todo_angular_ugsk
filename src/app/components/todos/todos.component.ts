import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos!: Todo[];
  inputTodo: string = "";

  constructor() { }

  save(id:number): void {
    let todosL = JSON.parse(localStorage.getItem('todos')??"");
    todosL[id] = this.todos[id];
    localStorage.setItem('todos', JSON.stringify(todosL));
  }

  ngOnInit(): void {
    this.todos = JSON.parse(localStorage.getItem('todos')??"")??[];
  }

  toggleDone(id: number) {
    this.todos[id].completed = !this.todos[id].completed;
    let todo = this.todos[id];
    this.todos.splice(id,1);
    this.todos.push(todo);
    this.todos.sort((x1, x2) => ((x1.completed ? 1 : 0) < (x2.completed ? 1 : 0)) ? -1 : 1)
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((v, i) => i !== id);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addTodo(event: { preventDefault: () => void; }) {
    this.todos.push({
      content: this.inputTodo,
      completed: false,
      editMode: false
    });
    this.inputTodo = "";
    event.preventDefault();
    this.todos.sort((x1, x2) => ((x1.completed ? 1 : 0) < (x2.completed ? 1 : 0)) ? -1 : 1)
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  toggleEdit(id: number): void {
    let todo = this.todos[id];
    todo.editMode = !todo.editMode;
    if (!todo.editMode)
      this.save(id);
  }

  ngOnDestroy() {
    this.todos.forEach(element => {
      element.editMode = false
    });
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}