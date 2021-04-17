import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { onChangeHelper } from '../../../helpers/on-change-helper';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit, OnChanges {

  @Input() public error: any;

  ngOnChanges(changes: SimpleChanges) {
    onChangeHelper.ifChanged(changes, 'error', (err: any) => {
      console.log(err);
    });
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.error);
  }

}
