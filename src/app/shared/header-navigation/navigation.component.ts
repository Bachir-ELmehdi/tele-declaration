import { Component, AfterViewInit, OnInit } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig
} from '@ng-bootstrap/ng-bootstrap';
import { DataShareService } from 'src/app/service/Data-Share/data-share.service';
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']

})
export class NavigationComponent implements AfterViewInit,OnInit {
   username:string;
  public showSearch = false;

  constructor(private modalService: NgbModal,
              private dataShare: DataShareService) {}

  ngAfterViewInit() {}
  ngOnInit(){
    this.dataShare.currentMessage.subscribe(message=> this.username = message);
  }
}
