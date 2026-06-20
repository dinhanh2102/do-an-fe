import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileProcess, MessageService } from 'src/app/shared';
import { ActivatedRoute, Router } from '@angular/router';
import { NhanVienService } from '../service/nhan-vien.service';
import { FileService } from 'src/app/shared/services/file.service';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent {
  @ViewChild('video') videoElement: ElementRef;

  videoUrl: string;
  mediaRecorder: any;
  recordedChunks: any[] = [];
  isCameraReady = false;
  isRecording = false;
  constructor(
    private service: NhanVienService,
    private messageService: MessageService,
    public fileProcess: FileProcess,
    public fileService: FileService,
    private routeA: ActivatedRoute,
    private router: Router,
  ) { }
  url;
  id: string;
  isView: any;
  format;
  model: any = {};
  ngOnInit() {
    this.id = this.routeA.snapshot.paramMap.get('id');

    this.getNhanVienById()
  }
  //Lấy thong tin người dùng theo id
  getNhanVienById() {
    this.service.getNhanVienById(this.id).subscribe(
      data => {
        if (data.isStatus) {
          this.model = data.data;
        }
      }, error => {
        this.messageService.showError(error);
      }
    );
  }
  file_up: any;
  selectedFileName: string = '';

  onSelectFile(event) {
    const selectedFile = event.target.files[0];
    this.selectedFileName = selectedFile ? selectedFile.name : '';
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if (file.type.indexOf('image') > -1) {
        this.format = 'image';
      } else if (file.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
      this.file_up = file;
    }

  }
  clearFile() {
    // Xóa tệp đã chọn
    this.selectedFileName = '';
    this.url = '';
    this.format = '';
    // Đặt lại giá trị của input file
    const fileInput = document.getElementById('inputGroupFile01') as HTMLInputElement;
    if (fileInput) fileInput.value = ''; // Xóa giá trị của input
    this.file_up = null;
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      this.videoElement.nativeElement.srcObject = stream;
      this.isCameraReady = true;
    }).catch(err => {
      this.messageService.showError('Không thể truy cập camera: ' + err.message);
    });
  }

  startRecording() {
    this.recordedChunks = [];
    const stream = this.videoElement.nativeElement.srcObject;
    this.mediaRecorder = new (window as any).MediaRecorder(stream);
    this.mediaRecorder.ondataavailable = (event: any) => {
      if (event.data.size > 0) {
        this.recordedChunks.push(event.data);
      }
    };
    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.recordedChunks, { type: 'video/mp4' });
      this.file_up = new File([blob], "recorded_video.mp4", { type: 'video/mp4' });
      this.url = URL.createObjectURL(blob);
      this.format = 'video';
      this.selectedFileName = 'recorded_video.mp4';
    };
    this.mediaRecorder.start();
    this.isRecording = true;
  }

  stopRecording() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    }
  }
  upload_image() {
    const folderName = this.model.maNhanVien; // Thay 'your_folder_name' bằng tên thư mục thực tế

    this.service.uploadVideo(this.file_up, folderName).subscribe(
      (response) => {
        console.log(response);
        
        console.log('Upload successful:', response);
        this.router.navigate(['/nhan-vien/manage']);
      },
      (error) => {
        console.error('Error uploading video:', error);
      }
    );
  }

  displayVideo(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.videoUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  closeModal(isOK: boolean) {
    if (this.fileProcess.fileModel.DataURL != undefined) {
      this.fileProcess.fileModel.DataURL = null;
    }
    const stream = this.videoElement?.nativeElement?.srcObject;
    if (stream) {
      stream.getTracks().forEach((track: any) => track.stop());
    }
    this.router.navigate(['/nhan-vien/manage']);
  }
  save(isOk: boolean) {
    this.upload_image();

  }
}
