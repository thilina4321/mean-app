import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(private postService: PostService,
    private router:Router
    ) {}
  posts: Post[] = [];
  postsSubsciption: Subscription = new Subscription();

  ngOnInit() {
    this.postsSubsciption = this.postService.getPosts.subscribe((newPosts) => {
      this.posts = newPosts;
    });
  }

  ngOnDestroy() {
    if (this.postsSubsciption) {
      this.postsSubsciption.unsubscribe();
    }
  }

  onEdit(id:string|undefined){
    this.router.navigate(['/', id])
  }

  onDelete(id:string|undefined){
    this.postService.deletePost(id)
  }
}
