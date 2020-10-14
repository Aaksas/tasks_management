import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../_services/sidebar.service';
import { TaskService } from 'src/app/_services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  receivedTask: any
  constructor(public sidebarservice: SidebarService,
    public taskService: TaskService
  ) { }
  item: any
  tasks: any = []
  requiredDesc: boolean[] = [];
  requiredDate: boolean[] = [];
  completed: any = []
  notCompleted: any = []
  myDate = new Date();
  ngOnInit() {
  }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggleRightSidebar(item: any) {
    this.item = item
    this.sidebarservice.setSidebarState2(!this.sidebarservice.getRightSideBarState());
  }

  getRightSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  receiveItem($event) {
    
    this.receivedTask.tasks = this.receivedTask.tasks.filter(a => a.shortDesc != $event.shortDesc)
    this.taskService.update(this.receivedTask._id, this.receivedTask).subscribe((res) => {
      this.sidebarservice.setSidebarState2(!this.sidebarservice.getRightSideBarState());
      this.completed = this.receivedTask.tasks.filter(a => a.done)
      this.notCompleted = this.receivedTask.tasks.filter(a => !a.done)
    })

  }
  receiveMessage($event) {
    this.receivedTask = $event
    this.completed = this.receivedTask.tasks.filter(a => a.done)
    this.notCompleted = this.receivedTask.tasks.filter(a => !a.done)
  }

  addTask() {
    if (!this.receivedTask.items) {
      this.receivedTask.items = []
    }
    this.receivedTask.items.push({ done: true, createAt: this.myDate })
  }

  deleteTask(index: number) {
    this.receivedTask.items.splice(index, 1)
  }

  checkItem(item) {
    item.done = !item.done
    this.taskService.update(this.receivedTask._id, this.receivedTask).subscribe((res) => {
      this.completed = this.receivedTask.tasks.filter(a => a.done)
      this.notCompleted = this.receivedTask.tasks.filter(a => !a.done)
    })

  }

  save() {
    this.receivedTask.items.forEach((element: any, i: any) => {
      this.requiredDesc[i] = !element.shortDesc || !element.shortDesc.trim().length;
      this.requiredDate[i] = !element.dueDate || !element.dueDate.trim().length;
    });
    let checker = arr => arr.every(v => v === false);
    if (checker(this.requiredDesc) && checker(this.requiredDate)) {
      if (!this.receivedTask.tasks) {
        this.receivedTask.tasks = [...this.receivedTask.items]
      } else {
        this.receivedTask.tasks = this.receivedTask.tasks.concat(this.receivedTask.items);
      }
      this.taskService.update(this.receivedTask._id, this.receivedTask).subscribe((res) => {
        this.completed = this.receivedTask.tasks.filter(a => a.done)
        this.notCompleted = this.receivedTask.tasks.filter(a => !a.done)
        this.receivedTask.items = []
      })
    }
  }


}
