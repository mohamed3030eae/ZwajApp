import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //تمرير البراميتر من الاب الى الابن
  // @Input() valuesFromRegister:any;
    //تمرير البراميتر من الابن الى الاب
  @Output () cancelRegister=new EventEmitter();
  model: any = {};
  constructor(private authService:AuthService) { }

  ngOnInit() {
  }
  register() {
    this.authService.register(this.model).subscribe(
    ()=>{console.log(' تم الإشتراك بنجاح')},
    erorr =>{console.log(erorr)}

    )
    
    
  }
  cancel() {
    console.log('ليس الأن')
    this.cancelRegister.emit(false);
  }
}
