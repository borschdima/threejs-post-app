import Post from "../Post/Post";
import CreatePost from "../CreatePost/CreatePost";
import FavouritePost from "../FavouritePost/FavouritePost";
import Firebase from "../../services/Firebase";

import "./navigation.scss";

export default class Navigation {
    constructor() {
        this.init();
    }

    init = () => {
        const post = new Post();
        const createPost = new CreatePost();
        const favouritePost = new FavouritePost();
        const firebase = new Firebase();

        firebase.init();
        post.init();
        favouritePost.init();
    };
}
