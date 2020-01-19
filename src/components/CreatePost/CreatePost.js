import Post from "../Post/Post";
import * as moment from "moment";
import Firebase from "../../services/Firebase";

import "./create-post.scss";

export default class CreatePost {
    constructor() {
        this.title = document.querySelector(`.navigation__section[data-id="create-post"] .create-post__title`);
        this.text = document.querySelector(`.navigation__section[data-id="create-post"] .create-post__text`);
        this.form = document.querySelector(`.navigation__section[data-id="create-post"] .create-post`);

        this.form.addEventListener("submit", this.formSubmit);
        this.firebase = new Firebase();
    }

    formSubmit = async e => {
        e.preventDefault();

        const title = this.title.value;
        const text = this.text.value;
        const date = this.getDate();

        const post = new Post();

        const postId = await this.firebase.addItem(title, text, date, false);

        post.render(postId, title, text, date);
        this.updateInfoMessage(post);

        this.form.reset();
    };

    getDate = () => {
        moment.locale("ru");
        return moment().format("L в LT");
    };

    updateInfoMessage = postInstance => {
        const postsInfoMessage = postInstance.container.querySelector(".navigation__info");

        if (postsInfoMessage) postsInfoMessage.remove();
    };
}
