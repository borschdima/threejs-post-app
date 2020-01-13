import Post from "../Post/Post";
import * as moment from "moment";

import "./create-post.scss";

export default class CreatePost {
    constructor() {
        this.title = document.querySelector(`.navigation__section[data-id="create-post"] .create-post__title`);
        this.text = document.querySelector(`.navigation__section[data-id="create-post"] .create-post__text`);
        this.form = document.querySelector(`.navigation__section[data-id="create-post"] .create-post`);

        this.form.addEventListener("submit", this.formSubmit);
    }

    formSubmit = e => {
        e.preventDefault();

        const postId = this.getPostId();
        const title = this.title.value;
        const text = this.text.value;
        const date = this.getDate();

        const post = new Post();

        this.updateStorage(post, postId, title, text, date);

        post.render(postId, title, text, date);

        this.form.reset();
    };

    getPostId = () => {
        const posts = JSON.parse(localStorage.getItem("posts"));

        return posts ? posts.length : 0;
    };

    getDate = () => {
        moment.locale("ru");
        return moment().format("L в LT");
    };

    updateStorage = (postInstance, id, title, text, date, favourite = false) => {
        const newPost = {
            id,
            title,
            text,
            date,
            favourite
        };
        let posts = [];
        const dbPosts = JSON.parse(localStorage.getItem("posts"));
        if (dbPosts) {
            posts = [...dbPosts];
            posts.push(newPost);
            localStorage.setItem("posts", JSON.stringify(posts));
        } else {
            localStorage.setItem("posts", JSON.stringify([newPost]));
            postInstance.container.firstElementChild.remove();
        }
    };
}
