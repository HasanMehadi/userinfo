import {Component, NgModule, OnInit} from '@angular/core';
import {DashBoardService} from "./dash-board.service";
import {LoginAuthService} from "../login/login-auth.service";
import {Router} from "@angular/router";



@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  loginUser: any = {};

  users=[];
  profile: boolean;
  username: string;
  size: number = 10;
  page: number = 0;
  totalElements: number = 0;
  currentStatus: any;
  role: any;

  constructor(private dashBoardService: DashBoardService,
              private loginAuthService: LoginAuthService,
              private router: Router,
  ) {

    this.loginAuthService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));

    this.currentStatus = this.loginAuthService.getStatus().subscribe((currentStatus) => {
      this.currentStatus = currentStatus;
    })

    this.profile=null;
  }

  ngOnInit() {

    this.username = this.loginUser.username;
    this.role = this.loginUser.role;
  }

  logOut() {

    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }

  getUserPage(pageNumber: any) {
    this.profile=true;
    this.users = null;
    this.dashBoardService.getUserPage(this.loginUser.token, pageNumber, this.size).subscribe((allUsers) => {
      this.users = allUsers.content;
      this.totalElements = allUsers.totalElements;
    })
  }

  pageChangeFire(page: number) {
    this.getUserPage(page - 1);

  }

  checkProfile(){
    this.profile=false
  }

  changePassword(){

  }
}
