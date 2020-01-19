import { renderPost } from "../../services/Renderer";
import Firebase from "../../services/Firebase";

import "./favourite-post.scss";

export default class FavouritePost {
    constructor() {
        this.container = document.querySelector(`.navigation__section[data-id="favourite"]`);
        this.info = document.querySelector(`.navigation__section[data-id="favourite"] > p`);
        this.firebase = new Firebase();
    }

    update = (id, title, text, date, favourite) => {
        if (favourite) {
            renderPost(id, title, text, date, favourite, this.container);
        } else {
            this.container.querySelector(`article[data-id="${id}"]`).remove();
        }

        this.checkNumberOfPosts();
    };

    init = async () => {
        const dbPosts = await this.firebase.getPosts();
        if (dbPosts.length > 0) {
            const favouritePosts = dbPosts.filter(post => post.favourite === true);

            favouritePosts.forEach(({ id, title, text, date, favourite }) => renderPost(id, title, text, date, favourite, this.container));

            this.info.style.display = favouritePosts > 0 ? "none" : "block";
        }
    };

    checkNumberOfPosts = async () => {
        const dbPosts = await this.firebase.getPosts();
        const favouritePosts = dbPosts.filter(post => post.favourite === true);

        if (favouritePosts.length > 0) this.info.style.display = "none";
        else this.info.style.display = "block";
    };
}
