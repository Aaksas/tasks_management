import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SidebarService } from 'src/app/_services/sidebar.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DeleteTaskComponent } from '../delete-task/delete-task.component';
import { TaskService } from 'src/app/_services/task.service';
@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class LeftSidebarComponent implements OnInit {
  tasks = [];
  task:any = {}
  constructor(public sidebarservice: SidebarService,
    public taskService : TaskService ,
    private modalService: NgbModal) {
    this.tasks = sidebarservice.getMenuList();
   }
   @Output() messageEvent = new EventEmitter<string>();

  ngOnInit() {
    this.getSideBarState() 
    this.getTasks()
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  addTask(){
    if(this.task.name){
      this.taskService.createTask(this.task).subscribe((res)=>{
        this.getTasks()
        this.task={}
      })     
    }
  }

  send(task :any){
    console.log('task',task);
    this.messageEvent.emit(task)
  }

  getTasks(){
    this.taskService.getTasks().subscribe(res =>{
      console.log('res',res);
      this.tasks = res
    })
  }

  open(item , i) {
    const modalRef = this.modalService.open(DeleteTaskComponent, {
      size: "lg"
    });
    modalRef.result.then(
      result => {
        this.taskService.delete(item._id).subscribe(
          () => {
            this.tasks.splice(i, 1);
          },
          err => {
            console.log(err);
          }
        );
      },
      () => { }
    );
  }


}