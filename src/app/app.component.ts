import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = new Task();
 selectedTask: Task = new Task();
  editing: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }
  onTitleChange(event: any) {
    this.selectedTask.title = event.target.value;
  }

  addTask(): void {
    console.log('Adding task...');
    this.taskService.addTask(this.newTask).subscribe(task => {
      console.log('Task added:', task);
      this.tasks.push(task);
      this.newTask = new Task();
      this.newTask.title = '';
      this.newTask.description = '';
    });
  }

  editTask(task: Task): void {
    this.selectedTask = task;
    this.editing = true;
  }

  updateTask(event: SubmitEvent): void {
    event.preventDefault();
    this.taskService.updateTask(this.selectedTask).subscribe(task => {
      this.selectedTask = new Task();
      this.editing = false;
    });
  }
  

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter(t => t !== task);
    });
  }
 
}