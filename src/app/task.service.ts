import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task';
import { TASKS } from './mock-tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  constructor() { }

  getTasks(): Observable<Task[]> {
    return of(TASKS);
  }

  addTask(task: Task): Observable<Task> {
    task.id = TASKS.length + 1;
    TASKS.push(task);
    return of(task);
  }

  updateTask(task: Task): Observable<Task> {
    const index = TASKS.findIndex(t => t.id === task.id);
    TASKS[index] = task;
    return of(task);
  }

  deleteTask(task: Task): Observable<Task> {
    const index = TASKS.findIndex(t => t.id === task.id);
    TASKS.splice(index, 1);
    return of(task);
  }
}