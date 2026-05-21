import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService, Constants } from 'src/app/shared';
import { GroupUserService } from '../../service/group-user.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/shared/services/language.service';
import { TreeGridComponent, extendArray } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-loai-cong-create',
  templateUrl: './group-user-create.component.html',
  styleUrls: ['./group-user-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GroupUserCreateComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private messageService: MessageService,
    private service: GroupUserService,
    public constant: Constants,
    private translate: TranslateService,
    private lgService: LanguageService
  ) { this.translate.use(this.lgService.getLanguage()); }
  @ViewChild('treegrid')
  public treegrid: TreeGridComponent;

  listPermission: any[] = [];
  isSelectAll = false;
  checkAll: boolean = false;
  modalInfo = {
    Title: 'Thêm mới nhóm người dùng',
    SaveText: 'Lưu',
  };
  height = 0;
  isAction: boolean = false;
  id: string;

  model: any = {
    id: '',
    name: '',
    type: null,
    description: '',
    listPermission: []
  }
  listNhom: any[] = [];
  groupSelect: any = {};
  groupSelectIndex: number = 0;

  ngOnInit(): void {
    this.height = window.innerHeight - 580;
    if (this.id) {
      this.modalInfo.Title = 'Chỉnh sửa nhóm người dùng';
      this.modalInfo.SaveText = 'Lưu';
    }
    else {
      this.modalInfo.Title = "Thêm mới nhóm người dùng";
    }

    this.getGroupUserInfo();
  }

  //Get thông tin nhóm người dùng
  getGroupUserInfo() {
    this.service.getGroupUserInfo(this.id).subscribe(result => {
      if (result.isStatus) {
        setTimeout(() => {
          this.model = result.data;
        }, 200);
      }
    }, error => {
      this.messageService.showError(error);
    });
  }

  //Thêm mới nhóm người dùng
  create(isContinue: any) {
    this.service.createGroupUser(this.model).subscribe(
      result => {
        if (result.isStatus) {
          this.messageService.showSuccess('Thêm mới nhóm người dùng thành công!');
          if (isContinue) {
            this.isAction = true;
            this.clear();
          } else {
            this.closeModal(true);
          }
        }
      },
      error => {
        this.messageService.showError(error);
      });
  }

  //Cập nhật nhóm người dùng
  update() {
    this.service.updateGroupUser(this.id, this.model).subscribe(
      result => {
        if (result.isStatus) {
          this.activeModal.close(true);
          this.messageService.showSuccess('Cập nhật nhóm người dùng thành công!');
        }
      },
      error => {
        this.messageService.showError(error);
      });
  }

  //Lưu nhóm người dùng
  save(isContinue: boolean) {
    //Tồn tại id thì cập nhật
    if (this.id) {
      this.update();
    } else {
      this.create(isContinue);
    }
  }

  //Lưu và tiếp tục
  saveAndContinue() {
    this.save(true);
  }

  //Đóng modal
  closeModal(isOK: boolean) {
    this.activeModal.close(isOK ? isOK : this.isAction);
  }

  //Clear dữ liệu trên giao diện
  clear() {
    this.model = {
      id: '',
      name: '',
      status: 1,
      description: '',
      listPermission: []
    };

    this.getGroupUserInfo();
  }

  //Select 1 dòng trên phân quyền chức năng
  rowGroupSelected($event: any) {
    this.groupSelectIndex = $event.rowIndex;
    this.groupSelect = $event.data;
    //Kiểm tra nếu collapsable thì set  Permission = []
    if (this.groupSelect.children == 0) {
      this.listPermission = $event.data.permissions;
    } else {
      this.listPermission = [];
    }

    //Kiểm tra để chek all
    var permissionsCheck = this.listPermission.filter(s => s.isChecked);
    if (this.listPermission.length > 0 && this.listPermission.length == permissionsCheck.length) {
      this.checkAll = true;
    } else {
      this.checkAll = false;
    }
  }

  //Chuyển trạng thái check all
  selectAll() {
    this.listPermission.forEach(itemFunc => {
      itemFunc.isChecked = this.checkAll;
    });

    var itemsChoose = this.listPermission.filter(a => a.isChecked);
    this.changeDataSub(this.model.listPermission, itemsChoose);

    //refresh tree
    this.treegrid.refresh();
    setTimeout(() => {
      this.treegrid.selectRow(this.groupSelectIndex);
    }, 100);
  }

  //Chek một chức năng
  checkItem(permission) {
    var itemsChoose = this.listPermission.filter(a => a.isChecked);
    if (itemsChoose.length == this.listPermission.length)
      this.checkAll = true;
    else
      this.checkAll = false;

    this.changeDataSub(this.model.listPermission, itemsChoose);

    //refresh tree
    this.treegrid.refresh();
    setTimeout(() => {
      this.treegrid.selectRow(this.groupSelectIndex);
    }, 100);
  }

  //Thay đổi dữ liệu một nhóm con
  changeDataSub(listSub: any[], permissionChoose: any[]) {
    listSub.forEach(item => {
      if (this.groupSelect.id == item.id) {
        item.checkCount = permissionChoose.length;
        item.permissions = this.listPermission;
      }

      if (item.children.length > 0)
        this.changeDataSub(item.children, permissionChoose);
    });
  }
}
