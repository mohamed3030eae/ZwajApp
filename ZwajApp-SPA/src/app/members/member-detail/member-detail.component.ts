import { DatePipe } from "@angular/common";
import { AfterViewChecked, Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TabsetComponent } from "ngx-bootstrap";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from "ngx-gallery";
import { User } from "src/app/_models/user";
import { AlertifyService } from "src/app/_services/alertify.service";
import { AuthService } from "src/app/_services/auth.service";
import { UserService } from "src/app/_services/user.service";

@Component({
  selector: "app-member-detail",
  templateUrl: "./member-detail.component.html",
  styleUrls: ["./member-detail.component.css"],
})
export class MemberDetailComponent implements OnInit , AfterViewChecked  {

  @ViewChild('memberTabs') memberTabs:TabsetComponent;
  user: User;
  created:string;
  age:string;
  options={weekday:'long',year:'numeric',month:'long',day:'numeric'};
  showIntro:boolean=true;
  showLook:boolean=true;
  paid:boolean=false;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}
  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.paid=this.authService.paid;
    }, 0);
  }

  ngOnInit() {

    // this.loadUser();
    this.paid=this.authService.paid;
    this.route.data.subscribe(data=> {
      this.user=data['user']
    });
    
    this.route.queryParams.subscribe(
      params=>{
        const selectedTab=params['tab'];
        this.memberTabs.tabs[selectedTab > 0?selectedTab:0].active=true;
      })
    

    this.galleryOptions=[{
      width:'500px',height:'500px',imagePercent:100,thumbnailsColumns:4,
      imageAnimation:NgxGalleryAnimation.Slide,preview:false
    }]

    this.galleryImages=this.getImages();
    this.created=new Date(this.user.created).toLocaleString('ar-EG',this.options).replace('،','');
    this.age=this.user.age.toLocaleString('ar-EG');
    this.showIntro=true;
    this.showLook=true;
  }




  getImages(){
    const imageUrls=[];
    for(let i =0;i<this.user.photos.length;i++){
      imageUrls.push({
        small:this.user.photos[i].url,
        medium:this.user.photos[i].url,
        big:this.user.photos[i].url,
      })
    };
    return imageUrls;
  }

  selectTab(tabId:number){
    this.memberTabs.tabs[tabId].active=true;
  }
  deselect() {
this.authService.hubConnection.stop();

  }
  // loadUser() {
  //   this.userService.getUser(this.route.snapshot.params["id"]).subscribe(
  //     (user: User) => {
  //       this.user = user;
  //     },
  //     (error) => {
  //       this.alertify.error(error);
  //     }
  //   );
  // }

  // [
  //   // this.getImages();

  //   {
  //     small: this.user.photoURL,
  //     medium: this.user.photoURL,
  //     big: this.user.photoURL
  // }
  // ];
}
