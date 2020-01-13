import FavouritePost from "../FavouritePost/FavouritePost";
import { renderPost } from "../../services/Renderer";

import "./post.scss";

export default class Post {
    constructor() {
        this.container = document.querySelector(`.navigation__section[data-id="posts"]`);

        this.favouriteComponent = new FavouritePost();
    }

    render = (id, title, text, date, favourite = false) => {
        // const starred = favourite ? "post__favourite--active" : "";
        // const post = `
        // <article class="post" data-id="${id}">
        //     <h3 class="post__title">${title}</h3>
        //     <p class="post__text">${text}</p>
        //     <div class="post__footer">
        //         <i class="post__favourite ${starred} fa fa-star" aria-hidden="true"></i>
        //         <span class="post__date">${date}</span>
        //     </div>
        // </article>
        // `;

        // this.container.insertAdjacentHTML("afterbegin", post);
        renderPost(id, title, text, date, favourite, this.container);
        this.toggleFavouriteHandler(id);
    };

    toggleFavouriteHandler = postId => {
        const starIcon = document.querySelector(`.navigation__section[data-id="posts"] article[data-id="${postId}"] i`);

        starIcon.addEventListener("click", () => {
            starIcon.classList.toggle("post__favourite--active");

            const dbPosts = JSON.parse(localStorage.getItem("posts"));
            let newData = [...dbPosts];

            newData.forEach(post => {
                if (post.id == postId) post.favourite = !post.favourite;
            });
            localStorage.setItem("posts", JSON.stringify(newData));

            this.favouriteComponent.update(postId);
        });
    };

    init = () => {
        const posts = JSON.parse(localStorage.getItem("posts"));

        if (posts) {
            this.container.firstElementChild.remove();
            posts.forEach(({ id, title, text, date, favourite }) => this.render(id, title, text, date, favourite));
        }
    };
}
