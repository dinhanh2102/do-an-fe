import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Injectable({
    providedIn: 'root'
})
export class Constants {
    QLNV: number = 1;
    KTNVS: number = 0;
    minDate = { year: 1945, month: 1, day: 1 };

    ScrollConfig: PerfectScrollbarConfigInterface = {
        suppressScrollX: false,
        suppressScrollY: false,
        minScrollbarLength: 20,
        wheelPropagation: true
    };

    ScrollXConfig: PerfectScrollbarConfigInterface = {
        suppressScrollX: false,
        suppressScrollY: true,
        minScrollbarLength: 20,
        wheelPropagation: true
    };
    ScrollYConfig: PerfectScrollbarConfigInterface = {
        suppressScrollX: true,
        suppressScrollY: false,
        minScrollbarLength: 20,
        wheelPropagation: true
    };

    HttpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    FileHttpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
    };

    StatusCode = {
        Success: 1,
        Error: 2,
        Validate: 3
    };

    statusSearch: any = {
        search: 1,
        excel: 2,
        pdf: 3
    }

    data: any = {
        statusSearch: 1,
        searchData: {}
    }
    SearchDataType = {
        Sample: 1,
        QuestionType: 2,
    };
    Category_Ethnicities = "Ethnicities";
    Category_Religions = "Religions";
    Category_Provinces = "Provinces";
    Category_Province = "Provinces";
    Category_Districts = "Districts";
    Category_Communes = "Communes";
    Category_Occupation = "Occupation";
    // Giới tính
    Gender = [
        { Id: 1, Name: 'Nam', Checked: false },
        { Id: 2, Name: 'Nữ', Checked: false },
    ];
    SearchExpressionTypes: any[] = [
        { Id: 1, Name: '=' },
        { Id: 2, Name: '>' },
        { Id: 3, Name: '>=' },
        { Id: 4, Name: '<' },
        { Id: 5, Name: '<=' }
    ];
    Disable = [
        { Id: true, Name: 'Đang sử dụng', Checked: false, BadgeClass: 'badge-success', },
        { Id: false, Name: 'Không sử dụng', Checked: false, BadgeClass: 'badge-danger', },
    ];

    ListPageSize = [5, 10, 15, 20, 25, 30];
    PageSizeFours = [9, 12, 15, 18, 21, 24];

    validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    listGioiTinh: any[] = [
        { Id: 1, Name: "Nam", BadgeClass: 'badge-success', },
        { Id: 2, Name: "Nữ", BadgeClass: 'badge-success', },
        { Id: 3, Name: "Khác", BadgeClass: 'badge-success', },
    ];
    DanhMuc: string = "DanhMuc";
    User_Name: string = "admin";
    User_Status = [
        { Id: 'false', Name: 'Đang hoạt động', Checked: false, BadgeClass: 'badge-success', },
        { Id: 'true', Name: 'Không hoạt động', Checked: false, BadgeClass: 'badge-danger', },
    ];

    UserHistory_Type: any = [
        { Id: 1, Name: 'Đăng nhập', Checked: false },
        { Id: 2, Name: 'Khai thác dữ liệu', Checked: false },
    ];

    b64EncodeUnicode(str: any) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            // function toSolidBytes(match, p1) {
            (match, p1) => {
                // console.debug('match: ' + match);
                return String.fromCharCode(("0x" + p1) as any);
            }));
    };

    //Loại control input
    ControlType: any = [
        { Id: 1, Name: 'Text box', Checked: false },
        { Id: 2, Name: 'Text area', Checked: false },
        { Id: 3, Name: 'Select', Checked: false },
        { Id: 4, Name: 'Check box', Checked: false },
        { Id: 5, Name: 'Radio', Checked: false },
        { Id: 6, Name: 'Datetime', Checked: false },
        { Id: 7, Name: 'Input number', Checked: false },
        { Id: 8, Name: 'Select search', Checked: false },
    ];

    //Kiểu mở cửa sổ giao diện
    WindowType: any = [
        { Id: 1, Name: 'Cửa sổ popup', Checked: false },
        { Id: 2, Name: 'Mở trên cửa sổ hiện tại', Checked: false },
        { Id: 3, Name: 'Mở sang tab mới', Checked: false },
        { Id: 4, Name: 'Mở sang cửa sổ mới', Checked: false }
    ];

    //Loại control hiển thị chi tiết
    ControlViewType: any = [
        { Id: 1, Name: 'Text', Checked: false },
        { Id: 2, Name: 'Text more', Checked: false }
    ];

    //Kiểu bố cục giao diện
    LayoutType: any = [
        { Id: 1, Name: 'Danh sách quản lý', Checked: false },
        { Id: 2, Name: 'Cây thư mục và danh sách', Checked: false }
    ];

    trangThai: any = [
        { Id: 1, Name: 'Chưa giải quyết', Checked: false, BadgeClass: 'badge-success', },
        { Id: 2, Name: 'Đang trong quá trình giải quyết', Checked: false, BadgeClass: 'badge-warning', },
        { Id: 3, Name: 'Đóng ca', Checked: false, BadgeClass: 'badge-warning', },
    ]

    loaiCa: any = [
        { Id: 1, Name: 'Tư Vấn', Checked: false, BadgeClass: 'badge-warning', },
        { Id: 2, Name: 'Hỗ trợ - Can Thiệp', Checked: false, BadgeClass: 'badge-success', },
    ]

    /// <summary>
    /// Loại tài khoản
    /// </summary>
    TypeUser: any =
        {
            /// <summary>
            /// Quản lý
            /// </summary>
            Manage: 1,
            /// <summary>
            /// Tỉnh
            /// </summary>
            Province: 2,
            /// <summary>
            /// Huyện
            /// </summary>
            District: 3,
            /// <summary>
            /// xã
            /// </summary>
            Ward: 4
        }

    DanhSachThang: any = [
        { Id: 1, Name: 'Tháng 1', Checked: false, BadgeClass: 'badge-success' },
        { Id: 2, Name: 'Tháng 2', Checked: false, BadgeClass: 'badge-success' },
        { Id: 3, Name: 'Tháng 3', Checked: false, BadgeClass: 'badge-success' },
        { Id: 4, Name: 'Tháng 4', Checked: false, BadgeClass: 'badge-success' },
        { Id: 5, Name: 'Tháng 5', Checked: false, BadgeClass: 'badge-success' },
        { Id: 6, Name: 'Tháng 6', Checked: false, BadgeClass: 'badge-success' },
        { Id: 7, Name: 'Tháng 7', Checked: false, BadgeClass: 'badge-success' },
        { Id: 8, Name: 'Tháng 8', Checked: false, BadgeClass: 'badge-success' },
        { Id: 9, Name: 'Tháng 9', Checked: false, BadgeClass: 'badge-success' },
        { Id: 10, Name: 'Tháng 10', Checked: false, BadgeClass: 'badge-success' },
        { Id: 11, Name: 'Tháng 11', Checked: false, BadgeClass: 'badge-success' },
        { Id: 12, Name: 'Tháng 12', Checked: false, BadgeClass: 'badge-success' }

    ]
    DanhSachNam: any = [
        { Id: 1, Name: 'Chưa giải quyết', Checked: false, BadgeClass: 'badge-success', },
        { Id: 2, Name: 'Đang trong quá trình giải quyết', Checked: false, BadgeClass: 'badge-warning', },
        { Id: 3, Name: 'Đóng ca', Checked: false, BadgeClass: 'badge-warning', },
    ]
    TrangThaiKyCong: any = [
        { Id: 1, Name: 'Đang chấm công', Checked: false, BadgeClass: 'badge-warning', },
        { Id: 2, Name: 'Hoàn thành', Checked: false, BadgeClass: 'badge-success', },
    ]
    KhoaKyCong: any = [
        { Id: 1, Name: 'Mở', Checked: false, BadgeClass: 'badge-success', },
        { Id: 2, Name: 'Khóa', Checked: false, BadgeClass: 'badge-danger', },
    ]

    NhanVienGroup: string = "nhân viên";


}