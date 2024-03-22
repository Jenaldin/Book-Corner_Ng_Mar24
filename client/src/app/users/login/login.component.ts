import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  isLoading: boolean = true;
  
  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

}
