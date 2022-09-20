import { Post } from 'src/app/post.model';
import { Component, Input, OnInit } from '@angular/core';

import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

//Before PostService 

// export class PostListComponent  {

//   /* posts = [
//     { title: "First Post", content: "This is the first post's content" },
//     { title: "Second Post", content: "This is the second post's content" },
//     { title: "Third Post", content: "This is the third post's content" }
//   ];*/

//   @Input() sent: Post[] = [];

// }

//-----------------------------------------------------------------------------------------

//After PostService
// export class PostListComponent implements OnInit {
//   posts: Post[] = [];

//   constructor(public postsService: PostsService) {}

//   ngOnInit() {
//     this.posts = this.postsService.getPosts();
// }

// }

//-----------------------------------------------------------------------------------------
//After RxJS
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}

