import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/_services/sidebar.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DeleteTaskComponent } from '../delete-task/delete-task.component';
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
    private modalService: NgbModal) {
    this.tasks = sidebarservice.getMenuList();
   }

  ngOnInit() {
    this.getSideBarState() 
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }
  addTask(){
    console.log('task',this.task);
    if(this.task.name){
      this.tasks.push(this.task)
      this.task={}
    }
    
  }

  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  open() {
    const modalRef = this.modalService.open(DeleteTaskComponent, {
      size: "lg"
    });
    // modalRef.componentInstance.item = item;
    modalRef.result.then(
      result => {
        // this.colorrangesService.delete(item._id).subscribe(
        //   () => {
        //     this.models.splice(i, 1);
        //   },
        //   err => {
        //     console.log(err);
        //   }
        // );
      },
      () => { }
    );
  }


}