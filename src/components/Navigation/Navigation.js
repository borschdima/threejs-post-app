import Post from "../Post/Post";
import CreatePost from "../CreatePost/CreatePost";
import FavouritePost from "../FavouritePost/FavouritePost";

import "./navigation.scss";

export default class Navigation {
    constructor() {
        this.init();
    }

    init = () => {
        const post = new Post();
        const createPost = new CreatePost();
        const favouritePost = new FavouritePost();

        post.init();
        favouritePost.init();
    };
}
