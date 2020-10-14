import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SidebarService } from 'src/app/_services/sidebar.service';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.css']
})
export class RightSidebarComponent implements OnInit {
  @Input() item: any;
  @Output() messageEvent = new EventEmitter<string>();

  constructor(
    public sidebarservice: SidebarService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {

  }

  getRightSideBarState() {
    return this.sidebarservice.getRightSideBarState();
  }

  deleteTask(item) {
    const modalRef = this.modalService.open(DeleteTaskComponent, {
      size: "lg"
    });
    modalRef.componentInstance.task = true;

    modalRef.result.then(
      result => {
          this.messageEvent.emit(item)
      },
      () => { }
    );
  }


}
