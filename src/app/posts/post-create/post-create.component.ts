import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  post!: Post;

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      if (params.params['id']) {
        this.postService
          .findPostToEdit(params.params['id'])
          .subscribe((data) => {
            this.post = data;
          });
      }
    });
  }

  onSubmit(form: NgForm) {
    const title = form.value.title;
    const description = form.value.description;

    if (this.post) {
      this.postService.onEditPost({ _id: this.post._id, title, description });
    } else {
      this.postService.addPosts(title, description);
    }

    form.reset();
  }
}
