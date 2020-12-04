import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post.model';
import { PostService } from '../post.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  imagePreview: string = '';
  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  form = new FormGroup({
    title: new FormControl(null, { validators: [Validators.required] }),
    description: new FormControl(null, { validators: [Validators.required] }),
    imageUrl: new FormControl(null,
      ),
  });

  post!: Post;

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      if (params.params['id']) {
        this.postService
          .findPostToEdit(params.params['id'])
          .subscribe((data) => {
            console.log(data);

            this.post = data;
            this.form.setValue({
              title:data.title,
              description:data.description,
              imageUrl:data.imageUrl
            })
          });
      }
    });
  }

  onImageChange(e: Event) {
    const file = (e.target as HTMLInputElement).files?.item(0);
    if (file) {
      this.form.patchValue({ imageUrl: file });
      this.form.patchValue({ imageUrl: file });
      this.form.updateValueAndValidity()

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const title = this.form.value.title;
    const description = this.form.value.description;
    const imageUrl = this.form.value.imageUrl;
    console.log(imageUrl);


    if (this.post) {
      this.postService.onEditPost({ _id: this.post._id, title, description, imageUrl });
    } else {
      this.postService.addPosts(title, description,imageUrl);
    }

    this.form.reset();
  }
}
