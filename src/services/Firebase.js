import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

import Model from "../components/Model/Model.js";

export default class Firebase {
    constructor() {
        this.firebaseConfig = {
            apiKey: "AIzaSyBmp9jABxCS2fVdWbOAOiqZWlvmJK_M3wg",
            authDomain: "fir-8ad0a.firebaseapp.com",
            databaseURL: "https://fir-8ad0a.firebaseio.com",
            projectId: "fir-8ad0a",
            storageBucket: "fir-8ad0a.appspot.com",
            messagingSenderId: "712770649827",
            appId: "1:712770649827:web:7ab607dd7a7e6be5684fd6"
        };
        this.auth = null;
    }

    init = () => {
        firebase.initializeApp(this.firebaseConfig);
        this.auth = firebase.auth();
        this.isSignUp();
    };

    addItem = async (title, text, date, favourite, author) => {
        const newPostKey = await firebase
            .database()
            .ref()
            .child("posts")
            .push().key;

        await firebase
            .database()
            .ref("posts/" + newPostKey)
            .set({
                title,
                text,
                date,
                favourite,
                author
            });

        return newPostKey;
    };

    updateItem = async (id, title, text, date, favourite, author) => {
        await firebase
            .database()
            .ref("posts/" + id)
            .set({
                title,
                text,
                date,
                favourite,
                author
            });
    };

    getPosts = async () => {
        let posts = [];
        await firebase
            .database()
            .ref("posts/")
            .once("value", snapshot =>
                snapshot.forEach(snapshotChild => {
                    posts.push(this.parseObject(snapshotChild));
                })
            );

        return posts;
    };

    parseObject = obj => {
        const values = obj.val();

        return { id: obj.key, ...values };
    };

    signUp = async (email, password) => {
        await this.auth.createUserWithEmailAndPassword(email, password);
    };

    logIn = async (email, password) => {
        await this.auth.signInWithEmailAndPassword(email, password);
    };

    isSignUp = () => {
        this.auth.onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                this.firebaseUser = firebaseUser;

                document.querySelector(".auth").style.display = "none";
                document.querySelector(".app").style.display = "block";

                localStorage.setItem("user", JSON.stringify(firebaseUser.email));
                new Model();
            } else {
                document.querySelector(".spinner").style.display = "none";
                document.querySelector(".auth").style.display = "block";

                localStorage.setItem("user", JSON.stringify(""));
            }
        });
    };
}
