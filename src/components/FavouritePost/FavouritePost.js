import { renderPost } from "../../services/Renderer";

import "./favourite-post.scss";

export default class FavouritePost {
    constructor() {
        this.container = document.querySelector(`.navigation__section[data-id="favourite"]`);
        this.info = document.querySelector(`.navigation__section[data-id="favourite"] > p`);
    }

    update = postId => {
        const dbPosts = JSON.parse(localStorage.getItem("posts"));

        const updatedPost = dbPosts.find(post => post.id === postId);
        const { id, title, text, date, favourite } = updatedPost;

        if (favourite) {
            renderPost(id, title, text, date, favourite, this.container);
        } else {
            this.container.querySelector(`article[data-id="${id}"]`).remove();
        }

        this.checkNumberOfPosts();
    };

    init = () => {
        const dbPosts = JSON.parse(localStorage.getItem("posts"));
        if (dbPosts) {
            const favouritePosts = dbPosts.filter(post => post.favourite === true);

            favouritePosts.forEach(({ id, title, text, date, favourite }) => renderPost(id, title, text, date, favourite, this.container));

            this.checkNumberOfPosts();
        }
    };

    checkNumberOfPosts = () => {
        const dbPosts = JSON.parse(localStorage.getItem("posts"));
        const favouritePosts = dbPosts.filter(post => post.favourite === true);

        if (favouritePosts.length > 0) this.info.style.display = "none";
        else this.info.style.display = "block";
    };
}
