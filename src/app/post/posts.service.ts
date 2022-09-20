import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Post } from '../post.model';

//Before PostService
// @Injectable({providedIn: 'root'})
// export class PostsService {
//   private posts: Post[] = [];

//   getPosts() {
//      return [...this.posts]; 
//   }

//   addPost(title: string, content: string) {
//     const post: Post = {title: title, content: content};
//     this.posts.push(post);
//   }
// }

//-----------------------------------------------------------------------------------------
//After PostService Before RxJS
// @Injectable({providedIn: 'root'})
// export class PostsService {
//   private posts: Post[] = [];

//   getPosts() {
//       return this.posts; 
//   }

//   addPost(title: string, content: string) {
//     const post: Post = {title: title, content: content};
//     this.posts.push(post);
//   }
// }

//-----------------------------------------------------------------------------------------
//After RxJS
@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();


  getPosts() {
     return [...this.posts]; 
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
