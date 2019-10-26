import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, ComponentFactory, ElementRef } from '@angular/core';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { GetCommentsService } from './services/get-comments.service';
// import { TokenInterceptor } from './auth/token.interceptor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  allComments;
  @ViewChild('signUp', { static: true, read: ViewContainerRef }) entry1: ViewContainerRef;
  @ViewChild('signIn', { static: true, read: ViewContainerRef }) entry2: ViewContainerRef;


  constructor(private getCommentsService: GetCommentsService,
                private resolver: ComponentFactoryResolver) { }


//[start] ngOnInit loads all the comments when app is loaded.
  ngOnInit() {
    this.fecthAllComments();
  }
//[end] ngOnInit loads all the comments when app is loaded.


//[start] Fetch all comments by call getAllComments function of service.
  fecthAllComments() {
    this.getCommentsService.getAllComments()
      .subscribe(data => {
        this.allComments = data;
        //  console.log('allComments' , this.allComments);
      });
  }
//[end] Fetch all comments by call getAllComments function of service.


  createComponent(componentName) {
    // console.log(componentName);
    if (componentName === 'Sign Up') {
      // console.log('inside sign Up');
      this.entry1.clear();
      this.entry2.clear();
      const factory = this.resolver.resolveComponentFactory(SignupComponent);
      const componentRef = this.entry1.createComponent(factory);
    } else if (componentName === 'Sign In') {
      // console.log('inside sign In');
      this.entry1.clear();
      this.entry2.clear();
      const factory = this.resolver.resolveComponentFactory(SigninComponent);
      const componentRef = this.entry2.createComponent(factory);
      componentRef.instance.userData.subscribe(loggedInUser => {
        console.log(loggedInUser);
      });  
    }
  };


}

