import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }
  @Input()  task :boolean  = false
  ngOnInit(): void {

  }

  save = () => {
    this.activeModal.close("ok");
  }
}
