import FavouritePost from "../FavouritePost/FavouritePost";
import { renderPost } from "../../services/Renderer";
import Firebase from "../../services/Firebase";

import "./post.scss";

export default class Post {
    constructor() {
        this.container = document.querySelector(`.navigation__section[data-id="posts"]`);

        this.favouriteComponent = new FavouritePost();
        this.firebase = new Firebase();
    }

    render = (id, title, text, date, favourite = false) => {
        renderPost(id, title, text, date, favourite, this.container);
        this.toggleFavouriteHandler(id, title, text, date, favourite);
    };

    toggleFavouriteHandler = (postId, title, text, date, favourite) => {
        const starIcon = document.querySelector(`.navigation__section[data-id="posts"] article[data-id="${postId}"] i`);

        starIcon.addEventListener("click", () => {
            starIcon.classList.toggle("post__favourite--active");
            const favouriteNew = starIcon.classList.contains("post__favourite--active") ? true : false;

            this.firebase.updateItem(postId, title, text, date, favouriteNew);
            this.favouriteComponent.update(postId, title, text, date, favouriteNew);
        });
    };

    init = async () => {
        const posts = await this.firebase.getPosts();

        if (posts.length > 0) {
            this.container.firstElementChild.remove();
            posts.forEach(({ id, title, text, date, favourite }) => this.render(id, title, text, date, favourite));
        }
    };
}
