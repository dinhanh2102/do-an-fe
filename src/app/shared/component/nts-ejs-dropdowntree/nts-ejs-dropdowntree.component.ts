import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropDownTreeComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'nts-ejs-dropdowntree',
  templateUrl: './nts-ejs-dropdowntree.component.html',
  styleUrls: ['./nts-ejs-dropdowntree.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NtsEjsDropdowntreeComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})
export class NtsEjsDropdowntreeComponent implements ControlValueAccessor {

  @ViewChild('sample')
  public ddTree: DropDownTreeComponent;

  _valueSingle: any = null;
  _value: any = null;
  _items = [];
  @Input() ntsDisabled: boolean;
  @Input() ntsItemDisabled: boolean;
  @Input() ntsValue: any = null;
  @Input() ntsText: string = null;
  @Input() ntsId: string;
  @Input() ntsPlaceholder: string;
  @Input()
  get items() { return this._items };
  set items(value: any[]) {
    if (value.length > 0) {
      this._items = value;
      this._items.forEach(element => {
        element.expanded = true;
      });
      this.fields = {
        dataSource: this._items, value: this.ntsValue, text: this.ntsText, expanded: "expanded", parentValue: "parentId", hasChildren: 'hasChild'
      };
    }
  };

  fields = {
  };

  @Output('change') changeEvent = new EventEmitter();

  private _onChange = (_: any) => { };
  private _onTouched = () => { };

  disableNodeId: any[] = [];

  constructor(
    private _cd: ChangeDetectorRef
  ) { }

  writeValue(value: any): void {
    if (value) {
      setTimeout(() => {
        this._value = [value];
        this._items.forEach(element => {
          if (element[this.ntsValue] == value) {
            this.ddTree.text = element[this.ntsText];
            this.ddTree.selectAll(true);
          }
        });

      }, 100);
    } else {
      this._value = [];
      if (this.ddTree) {
        this.ddTree.text = '';
      }
    }
    this._cd.markForCheck();
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.ntsDisabled = isDisabled;
    this._cd.markForCheck();
  }

  onChange(event: any) {
    if (this._valueSingle && event.value.length == 0 || this._valueSingle != event.value[0]) {
      this._valueSingle = event.value[0];
      this._onChange(this._valueSingle ? this._valueSingle : null);
      this.changeEvent.emit(this._valueSingle ? this._valueSingle : null);
    }
  }

  // change() {
  //   if (this.ddTree.value && this.ddTree.value.length == 0) {
  //     this._value = null;
  //     this._onChange(this._value ? this._value : null);
  //     this.changeEvent.emit(this._value ? this._value : null);
  //   }
  // }

  dataBound($event) {
    if (this.ntsItemDisabled) {
      this.disableNodeId = [];
      for (var i = 0; i < $event.data.length; i++) {
        if ($event.data[i].isDisabled) {
          var nodeId = $event.data[i][this.ntsValue];
          this.disableNodeId.push(nodeId);
        }
      }
      (this.ddTree as any).treeObj.disableNodes(this.disableNodeId);
    }
  }
}
