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

  addPosts(title: string, description: string) {
    const post = { title, description };
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

  findPostToEdit(id:string|undefined){
    return this.http.get<Post>('http://localhost:3000/posts/'+id)
  }

  onEditPost(post:Post){
    this.http.patch('http://localhost:3000/posts/' + post._id, post).subscribe(()=>{
      console.log('Congratulation you did it');
      this.router.navigate(['/posts']);


    })
  }

  deletePost(id: string | undefined) {
    this.http.delete('http://localhost:3000/posts/' + id).subscribe((data) => {
      this.posts = this.posts.filter((p) => p._id !== id);
      this.posts$.next([...this.posts]);
    });
  }
}
