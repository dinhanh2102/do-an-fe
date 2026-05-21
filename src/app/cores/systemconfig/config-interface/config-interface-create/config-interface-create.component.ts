import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, Constants, ComboboxService, FileProcess, Configuration } from 'src/app/shared';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';
import { forEach } from 'angular';
import { RowDDService, SelectionService, TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { FileService } from 'src/app/shared/services/file.service';
import { ConfigInterfaceService } from '../../service/configInterface.service';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-config-interface-create',
  templateUrl: './config-interface-create.component.html',
  styleUrls: ['./config-interface-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [RowDDService, SelectionService]
})
export class ConfigInterfaceCreateComponent implements OnInit {

  constructor(
    private config: Configuration,
    private messageService: MessageService,
    public constant: Constants,
    private translate: TranslateService,
    private lgService: LanguageService,
    private comboboxService: ComboboxService,
    public fileProcess: FileProcess,
    private fileService: FileService,
    private configInterfaceService: ConfigInterfaceService,
  ) { this.translate.use(this.lgService.getLanguage()); }

  @ViewChild('treegrid')
  public treegrid: TreeGridComponent;
  @ViewChild('fileInputFolder')
  myInputFolderVariable!: ElementRef;
  templatePathFolder: string = '';

  @ViewChild('fileInputIcon')
  myInputVariable!: ElementRef;
  templatePath: string = '';
  fileToUploadLogo: any;
  fileToUploadIcon: any;
  modalInfo = {
    Title: 'Cấu hình hệ thống',
    SaveText: 'Lưu',
  };
  server = '';
  urlLogo = '';
  urlIcon = '';
  isData: boolean = false;
  model: any = {
    softwareName: '',
    isUseMultiLanguage: false,
    isUseCaptcha: false,
    filePathLogo: '',
    filePathIcon: '',
    isShowLogoTopBar: false,
    logo: 'test',
    menuType: 1,
    croppedImage: ''
  }

  ngOnInit(): void {
    this.getConfig();
    //Hứng sự kiện thay đổi ngôn ngữ để load lại Component
    this.lgService.onLanguageChanged.pipe().subscribe(languageCode => {
      if (languageCode) {
        this.translate.use(languageCode);
      }
    });
    this.server = this.config.ServerApi;
  }
  getConfig() {
    this.configInterfaceService.getConfig().subscribe(
      (data: any) => {
        if (data.data) {
          this.model = data.data;
          this.urlLogo = this.server + this.model.filePathLogo;
          this.urlIcon = this.server + this.model.filePathIcon;
          localStorage.setItem('configInterface', JSON.stringify(data.data));
        }

      },
      error => {
        this.messageService.showError(error);
      });
  }
  createOrUpdate() {
    this.configInterfaceService.createOrUpdate(this.model).subscribe(
      (data: any) => {
        if (this.model.id) {
          this.messageService.showSuccess("Cập nhật thành công");
        } else {
          this.messageService.showSuccess("Thêm mới thành công");
        }
        localStorage.removeItem('configInterface');
        this.imageChangedEvent = '';
        this.getConfig();

      },
      error => {
        this.messageService.showError(error);
      });
  }
  save() {
    if (this.fileToUploadIcon) {
      this.fileService.uploadFile(this.fileToUploadIcon, 'ConfigInterface/Icon').subscribe(
        result => {
          this.model.filePathIcon = result.data.fileUrl;
          this.createOrUpdate();
        },
        error => {
          this.messageService.showError(error);
        });
    } else {
      this.createOrUpdate();
    }
  }
  previewIcon: any;
  selectedFile: File;
    handleFileInputIcon($event) {
    this.fileProcess.onAFileChange($event);
    this.fileToUploadIcon = this.fileProcess.FileDataBase;
  }
  showLogo() {
    window.open(this.urlLogo, "_blank");
  }
  showIcon() {
    window.open(this.urlIcon, "_blank");
  }

  imageChangedEvent: any = '';
  fileChangeEvent(event: any): void {  
    this.imageChangedEvent = event;
  }
  imageCropped(e: ImageCroppedEvent) {
    this.model.croppedImage = e.base64
  }
}
