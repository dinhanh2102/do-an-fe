import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { LanguageService } from './shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { SignalRService } from './signalR/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  lang: string;
  constructor(
    private titleService: Title,
    public translate: TranslateService,
    public lgService: LanguageService,
    public  signalRService: SignalRService
  ) {
    this.translate.use(this.lgService.getLanguage());
  }

  ngOnInit() {
    this.translate.get('ProductName').subscribe((value: string) => {
      this.titleService.setTitle(value);
    });
    
    // this.signalRService.initSignalR("http://localhost:2311/signalr");
    // this.signalRService.startConnection();
  }

  ngOnDestroy() {
    //this.signalRService.disConnect();
  }
}
