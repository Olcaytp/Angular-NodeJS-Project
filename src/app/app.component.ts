import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//Before PostService
// export class AppComponent {
//   storedPosts: Post[] = [];

//   onPostAdded(sent) {
//     this.storedPosts.push(sent);
//   }
// }
//-----------------------------------------------------------------------------------------
//After PostService
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
