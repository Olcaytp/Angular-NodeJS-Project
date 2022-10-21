import { map, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

import { Post } from '../post.model';
import { response } from 'express';
//mongo password = sWPjddX2sC4UC7ny

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
// @Injectable({providedIn: 'root'})
// export class PostsService {
//   private posts: Post[] = [];
//   private postsUpdated = new Subject<Post[]>();


//   getPosts() {
//      return [...this.posts];
//   }

//   getPostUpdateListener() {
//     return this.postsUpdated.asObservable();
//   }

//   addPost(title: string, content: string) {
//     const post: Post = {title: title, content: content};
//     this.posts.push(post);
//     this.postsUpdated.next([...this.posts]);
//   }
// }

//-----------------------------------------------------------------------------------------
//After Angular HttpClient with Backend

// @Injectable({ providedIn: "root" })
// export class PostsService {
//   private posts: Post[] = [];
//   private postsUpdated = new Subject<Post[]>();

//   constructor(private http: HttpClient) {}

//   getPosts() {
//     this.http
//       .get<{ message: string; posts: Post[] }>(
//         "http://localhost:3000/api/posts"
//       )
//       .subscribe(postData => {
//         this.posts = postData.posts;
//         this.postsUpdated.next([...this.posts]);
//       });
//   }

//   getPostUpdateListener() {
//     return this.postsUpdated.asObservable();
//   }

//   addPost(title: string, content: string) {
//     const post: Post = { id: null, title: title, content: content };
//     this.http
//       .post<{ message: string }>("http://localhost:3000/api/posts", post)
//       .subscribe(responseData => {
//         console.log(responseData.message);
//         this.posts.push(post);
//         this.postsUpdated.next([...this.posts]);
//       });
//   }
// }

//-----------------------------------------------------------------------------------------
//After MongoDB and Mongoose Database

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

/* //Before section7 - pagination
  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        "http://localhost:3000/api/posts"
      )
      .pipe(
        map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
  */

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "http://localhost:3000/api/posts" + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath
              };
            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{ _id: string; title: string; content: string, imagePath: string }>(
      "http://localhost:3000/api/posts/" + id
    );
  }

 /* //Before image upload multer
  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string, postId: string }>("http://localhost:3000/api/posts", post)
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }
  */

  /*  //Before section7 - pagination
  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http
      .post<{ message: string; post: Post }>(
        "http://localhost:3000/api/posts",
        postData
      )
      .subscribe(responseData => {
        const post: Post = {
        id: responseData.post.id,
        title: title,
        content: content,
        imagePath: responseData.post.imagePath
        };
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }
  */

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http
      .post<{ message: string; post: Post }>(
        "http://localhost:3000/api/posts",
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  //UppdatePost() before image update
  /*
  updatePost(id: string, title: string, content: string,) {
    const post: Post = { id: id, title: title, content: content };
    this.http
      .put("http://localhost:3000/api/posts/" + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }
*/
/* //Before section7 - pagination
updatePost(id: string, title: string, content: string, image: File | string) {
  let postData: Post | FormData;
  if (typeof image === "object") {
    postData = new FormData();
    postData.append("id", id);
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
  } else {
    postData = {
      id: id,
      title: title,
      content: content,
      imagePath: image
    };
  }
  this.http
    .put("http://localhost:3000/api/posts/" + id, postData)
    .subscribe(response => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
      const post: Post = {
        id: id,
        title: title,
        content: content,
        imagePath: ""
      };
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(["/"]);
    });
}
*/

updatePost(id: string, title: string, content: string, image: File | string) {
  let postData: Post | FormData;
  if (typeof image === "object") {
    postData = new FormData();
    postData.append("id", id);
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
  } else {
    postData = {
      id: id,
      title: title,
      content: content,
      imagePath: image
    };
  }
  this.http
    .put("http://localhost:3000/api/posts/" + id, postData)
    .subscribe(response => {
      this.router.navigate(["/"]);
    });
}
  /* //Befre section7 - pagination
  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
  */

  deletePost(postId: string) {
    return this.http
      .delete("http://localhost:3000/api/posts/" + postId);
  }
}
