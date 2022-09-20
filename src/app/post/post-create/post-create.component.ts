import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Post } from "src/app/post.model";
import { PostsService } from "../posts.service";


@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
//Before PostService
// export class PostCreateComponent {
//     /* //My self learning area
//     newPost = 'No Content';
//     newPost2 = 'No Content';
//     newPost3 = 'No Content';
//     enteredValue = '';
//     onAddPost() {
//         this.newPost = 'The user\'s post';
//         alert('Post added!');
//     }
//     onAddPost2(postInput: HTMLTextAreaElement) {
//         this.newPost = 'The user\'s post';
//         this.newPost2 = postInput.value;
//     }
//     onnewAddPost3() {
//         this.newPost3 = this.enteredValue;
//     }
//     */

//     enteredTitle = "";
//     enteredContent = "";
//     @Output() postCreated = new EventEmitter<Post>();
  
//     onAddPost(form: NgForm) {
//       if (form.invalid) {
//         return;
//       }
//       const posta: Post = {
//         title: form.value.title,
//         content: form.value.content
//       };
//       this.postCreated.emit(posta);
//     }
// }

//-----------------------------------------------------------------------------------------
//After PostService 
// export class PostCreateComponent {
//   enteredTitle = "";
//   enteredContent = "";

//   constructor(public postsService: PostsService) {}

//   onAddPost(form: NgForm) {
//     if (form.invalid) {
//       return;
//     }
//     this.postsService.addPost(form.value.title, form.value.content);
//   }
// }

//After RxJS 
export class PostCreateComponent {
  enteredTitle = "";
  enteredContent = "";

  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}