import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient, private router: Router) {}

  private posts: Post[] = [];
  private posts$ = new Subject<Post[]>();

  addPosts(title: string, description: string, image: File) {
    // const post = { title, description };
    const post = new FormData();
    post.append('title', title);
    post.append('description', description);
    post.append('image', image, title);
    this.http
      .post<Post>('http://localhost:3000/posts', post)
      .subscribe((post) => {
        this.posts.push(post);
        this.posts$.next([...this.posts]);
        this.router.navigate(['/posts']);
      });
  }

  get getPosts() {
    this.http.get<Post[]>('http://localhost:3000/posts').subscribe((data) => {
      this.posts = data;
      this.posts$.next([...this.posts]);
    });
    return this.posts$.asObservable();
  }

  findPostToEdit(id: string | undefined) {
    return this.http.get<Post>('http://localhost:3000/posts/' + id);
  }

  onEditPost(post: Post) {
    let updatePost: Post | FormData;
    if (typeof post.imageUrl == 'object') {
      console.log('koolaa ow');

      updatePost = new FormData();
      updatePost.append('title', post.title);
      updatePost.append('description', post.description);
      updatePost.append('image', post.imageUrl, post.title);
    } else {
      updatePost = post;
    }
    this.http
      .patch('http://localhost:3000/posts/' + post._id, updatePost)
      .subscribe(() => {
        console.log('Congratulation you did it');
        this.router.navigate(['/posts']);
      });
  }

  deletePost(id: string | undefined) {
    this.http.delete('http://localhost:3000/posts/' + id).subscribe((data) => {
      this.posts = this.posts.filter((p) => p._id !== id);
      this.posts$.next([...this.posts]);
    });
  }
}
