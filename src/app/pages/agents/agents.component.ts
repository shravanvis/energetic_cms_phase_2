import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddAgentsComponent } from 'app/modals/add-agents/add-agents.component';
import { ApiService } from 'app/service/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  allAgents = [];

  ngOnInit(): void {
    this.getallAgents();
  }

  add() {
    const modalRef = this.modalService.open(AddAgentsComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getallAgents()
    })
  }

  edit(agent) {
    const modalRef = this.modalService.open(AddAgentsComponent, {
      backdrop: 'static',
      size: <any>'profiletutor',
      keyboard: false,
      centered: true
    });
    modalRef.closed.subscribe((result) => {
      console.log('dismissed:-' + JSON.stringify(result));
      this.getallAgents()
    })
    modalRef.componentInstance.agent = agent;
  }

  delete(id: number) {
    var result = confirm("Are you sure to delete?");
    if (result) {
      this.apiService.getAPI(this.apiService.BASE_URL + 'user/deleteUser/' + id).then((result) => {
        if (result.status) {
          alert("Deleted");
          this.getallAgents();
        } else {
          alert("Not found");
        }

      }, (error) => {
        alert("something went wrong");
      })
    }
  }

  getallAgents() {
    this.apiService.getAPI(this.apiService.BASE_URL + "user/getAllAgents").then((result) => {
      if (result.status) {
        this.allAgents = result.result.filter(result => (result.status == 1) || (result.status == 2))
        console.log(this.allAgents);
      } else {
        this.toast.error(result.message)
      }
    }, (error) => {
      console.log(error);
      this.toast.error("something went wrong")
    })
  }
}
