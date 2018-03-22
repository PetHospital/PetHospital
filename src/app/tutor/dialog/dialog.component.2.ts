import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  index: number;
  dialogs: Array<object>;
  dialog: object = {};
  sysDialog: Array<string>;


  constructor() {
    this.index = 0;
    this.dialog["sys"] = this.sysDialog[this.index];
   }

  ngOnInit() {
  }

}
