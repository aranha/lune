import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/shared/services/events.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { delay } from 'q';

export interface admins {
  firstName: string;
  email: string;
  role: string;

}

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  // usuarios: admins[]; 
  adminForm: FormGroup;
  items_admin: admins[];
  all_items_admin: admins[] = [];

  ELEMENT_DATA: admins[];

  constructor(
    private eventService: EventsService,
    private formBuilder: FormBuilder
  ) { }

  setAll(items_admin){
    this.all_items_admin = items_admin;
    this.items_admin = this.all_items_admin;
    this.dataSource = this.all_items_admin;
  }

  columnsToDisplay: string[] = ['name', 'role', 'email'];

  dataSource = this.ELEMENT_DATA;

  ngOnInit() {
    this.adminForm =this.formBuilder.group({
      email: ['', Validators.required]
    })
    this.loadUsersList();

  }

  loadUsersList(){
    this.eventService.get_users().subscribe(
      (data: admins) => this.setAll(data),
    );
  }  

  elevateAdmin(email: string){
    console.log(email);
    this.eventService.update_toAdmin(email).subscribe(obj => {
      this.loadUsersList();
    });
    
  }
}
