import { Component, OnInit } from '@angular/core';
import { AppSetting } from 'src/app/shared';

@Component({
  selector: 'app-screen-wait',
  templateUrl: './screen-wait.component.html',
  styleUrls: ['./screen-wait.component.scss']
})
export class ScreenWaitComponent implements OnInit {

  constructor(
    public appSetting: AppSetting,
  ) { }

  ngOnInit(): void {
    this.appSetting.PageTitle = "";
  }

}
