import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, CdkDragEnter, CdkDragMove, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-reordering-subcategory',
  templateUrl: './reordering-subcategory.component.html',
  styleUrls: ['./reordering-subcategory.component.css']
})
export class ReorderingSubcategoryComponent implements OnInit {
  category_id;
  allsubcat = [];
  allcat = [];
  public items;

  all_orderId = [];
  @ViewChild('dropListContainer') dropListContainer?: ElementRef;

  dropListReceiverElement?: HTMLElement;
  dragDropInfo?: {
    dragIndex: number;
    dropIndex: number;
  };

  constructor(
    private modalService: NgbModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.cat();
  }

  oncatchange() {
    this.subcat(this.category_id)
  }

  subcat(id) {
    this.apiService.getAPI(this.apiService.BASE_URL + 'subCategory/getSubCategoryBycategory/' + id).then((result) => {
      console.log(result.result)
      this.allsubcat = result.result;
      this.items = result.result;
      this.all_orderId = [];
      this.items.forEach(element => {
        this.all_orderId.push(element.order_id);
      });
      console.log(this.all_orderId)
    })
  }

  cat() {
    this.apiService.getAPI(this.apiService.BASE_URL + 'category').then((result) => {
      this.allcat = result.result;
    })
  }

  dragEntered(event: CdkDragEnter<number>) {
    const drag = event.item;
    const dropList = event.container;
    const dragIndex = drag.data;
    const dropIndex = dropList.data;

    this.dragDropInfo = { dragIndex, dropIndex };

    const phContainer = dropList.element.nativeElement;
    const phElement = phContainer.querySelector('.cdk-drag-placeholder');

    if (phElement) {
      phContainer.removeChild(phElement);
      phContainer.parentElement?.insertBefore(phElement, phContainer);

      console.log(this.items)
      moveItemInArray(this.items, dragIndex, dropIndex);
    }
  }

  dragMoved(event: CdkDragMove<number>) {
    if (!this.dropListContainer || !this.dragDropInfo) return;

    const placeholderElement =
      this.dropListContainer.nativeElement.querySelector(
        '.cdk-drag-placeholder'
      );

    const receiverElement =
      this.dragDropInfo.dragIndex > this.dragDropInfo.dropIndex
        ? placeholderElement?.nextElementSibling
        : placeholderElement?.previousElementSibling;

    if (!receiverElement) {
      return;
    }

    receiverElement.style.display = 'none';
    this.dropListReceiverElement = receiverElement;

  }

  dragDropped(event: CdkDragDrop<number>) {
    if (!this.dropListReceiverElement) {
      return;
    }

    this.dropListReceiverElement.style.removeProperty('display');
    this.dropListReceiverElement = undefined;
    this.dragDropInfo = undefined;

    // console.log(this.all_orderId)
    setTimeout(() => {
      this.shuffle()
    }, 1000);
  }

  add() {
    this.items.push(this.items.length + 1);
  }

  // shuffle() {
  //   this.items.sort(function () {
  //     return 0.5 - Math.random();
  //   });
  // }

  shuffle() {
    console.log(this.all_orderId)
    this.items.forEach((item, index) => {
      let postdata = {
        'id': item.id,
        'order_id': this.getvalueindex(index)
      }
      this.apiService.postAPI(this.apiService.BASE_URL + 'subCategory/updateSubCategory', postdata).then((res) => { })
    })
  }

  getvalueindex(value) {
    return this.all_orderId[value]
  }
}
