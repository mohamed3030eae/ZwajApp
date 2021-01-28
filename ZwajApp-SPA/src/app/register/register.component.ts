import { formatCurrency } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { BsDatepickerConfig, BsLocaleService } from "ngx-bootstrap";
import { from } from "rxjs";
import { AlertifyService } from "../_services/alertify.service";
import { AuthService } from "../_services/auth.service";
import { defineLocale } from "ngx-bootstrap/chronos";
import { arLocale } from "ngx-bootstrap/locale";
import { User } from "../_models/user";
import { Router } from "@angular/router";
defineLocale("ar", arLocale);
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  //تمرير البراميتر من الاب الى الابن
  // @Input() valuesFromRegister:any;
  //تمرير البراميتر من الابن الى الاب

  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  locale = "ar";
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: Router
  ) {
    this.localeService.use(this.locale);
  }

  ngOnInit() {
    // this.registerForm = new FormGroup({
    //   username: new FormControl('',Validators.required),
    //   password: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]),
    //   ConfirmPassword: new FormControl('',Validators.required),
    // },this.passwordMatchValidator);

    this.bsConfig = {
      containerClass: "theme-red",
      showWeekNumbers: false,
    };
    this.createRegisterForm();
  }
  passwordMatchValidator(form: FormGroup) {
    return form.get("password").value === form.get("ConfirmPassword").value
      ? null
      : { mismatch: true };
  }
  // emailMatchValidator(control: FormGroup) {
  //   return control.get("email").value === control.get("ConfirmEmail").value
  //     ? null
  //     : { mismatch: true };
  // }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        gender: ["رجل"],
        username: ["", Validators.required],
        knownAs: ["", Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ["", Validators.required],
        country: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        // ConfirmEmail:['', [Validators.required, Validators.email]],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ],
        ],
        ConfirmPassword: ["", Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          this.alertify.success(" تم الإشتراك بنجاح");
        },
        (erorr) => {
          this.alertify.error(erorr);
        },
        () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(["/members"]);
          });
        }
      );
    }
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
