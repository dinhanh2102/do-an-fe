import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from '../../common/Constants';
import { FileProcess } from '../../common/file-process';
import { ComboboxService } from '../../services/combobox.service';
import { FileService } from '../../services/file.service';
import { MessageService } from '../../services/message.service';
import { NtsViewFileService } from '../../services/nts-view-file.service';

@Component({
  selector: 'app-nts-view-file',
  templateUrl: './nts-view-file.component.html',
  styleUrls: ['./nts-view-file.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NtsViewFileComponent implements OnInit {

  @ViewChild('pdfViewer', { static: false }) public pdfViewer;
  pdfSource: any = "";
  images: any[] = []
  isImg = false;
  id: any;
  pathFile: string;
  nameFile: string;

  searchTemplateModel: any = {
    id: 0,
    totalItems: 0,
    name: ''
  };

  startIndex: number = 1;
  selectTemplateIndex: number = 0;
  height: number = 0;

  fileViewIndex: number = -1;
  fileViewIndexView: number = 0;

  constructor(
    public constant: Constants,
    private activeModal: NgbActiveModal,
    private comboboxService: ComboboxService,
    public messageService: MessageService,
    public fileProcess: FileProcess,
    private sanitizer: DomSanitizer,
    private fileService: FileService,
    private ntsViewFileService: NtsViewFileService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.height = window.innerHeight - 250;

    if (this.pathFile) {
      this.viewFile(true, this.pathFile)
    }
  }

  viewFile(isNext: boolean, pathFile: string) {
    if (isNext) {
      this.fileViewIndex = this.fileViewIndex + 1;
    } else if (!isNext) {
      this.fileViewIndex = this.fileViewIndex - 1;
    }

    this.ntsViewFileService.getFile(pathFile).subscribe(data => {

      if (isNext) {
        this.fileViewIndexView = this.fileViewIndexView + 1;
      } else if (!isNext) {
        this.fileViewIndexView = this.fileViewIndexView - 1;
      }

      var blob = new Blob([data], { type: 'octet/stream' });
      var url = window.URL.createObjectURL(blob);
      this.pdfSource = url;

      if (data.type.includes("pdf")) {
        this.isImg = false;
        this.changeDetectorRef.detectChanges();
        this.pdfViewer.pdfSrc = blob;
        this.pdfViewer.refresh()
      } else if (data.type.includes("image")) {
        this.images = [];
        this.isImg = true;
        const blob = new Blob([data], { type: 'image/png' });
        var unsafeImg = window.URL.createObjectURL(blob);
        let img = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        this.images.push(img);
      }
      else {
        this.downloadFile(pathFile, this.nameFile);
      }

    }, error => {
      const blb = new Blob([error.error], { type: "text/plain" });
      const reader = new FileReader();

      reader.onload = () => {
        this.messageService.showMessage(reader.result.toString().replace('"', '').replace('"', ''));
      };
      // Start reading the blob as text.
      reader.readAsText(blb);
    });

  }

  downloadFile(pathFile: string, nameFile: string) {
    let fileDowload = {
      pathFile: pathFile,
      nameFile: nameFile
    }

    this.fileService.downloadFile(fileDowload).subscribe(data => {
      var blob = new Blob([data], { type: 'octet/stream' });
      var url = window.URL.createObjectURL(blob);
      this.fileProcess.downloadFileLink(url, nameFile);
    }, error => {
      const blb = new Blob([error.error], { type: "text/plain" });
      const reader = new FileReader();

      reader.onload = () => {
        this.messageService.showMessage(reader.result.toString().replace('"', '').replace('"', ''));
      };
      // Start reading the blob as text.
      reader.readAsText(blb);
    });
  }

  closeModal() {
    this.activeModal.close(false);
  }

}
