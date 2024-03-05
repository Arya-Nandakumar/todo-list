import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, inject} from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input() taskList: any[] = [];
  @Output() important = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();
  httpService = inject(HttpService);

  
  markImportant(task: any) {
    this.important.emit(task);
  }
  markComplete(task: any) {
    this.complete.emit(task);
  }

  // editTask(task:any){
  //   console.log("Task is being editted");
  // }

  deleteTask(task: any) {
    this.httpService.deleteTask(task).subscribe(() => {
      const index = this.taskList.indexOf(task);
      if (index !== -1) {
        this.taskList.splice(index, 1);
      }
    });
  }

  
}
