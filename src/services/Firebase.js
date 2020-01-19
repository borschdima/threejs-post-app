import * as firebase from "firebase/app";
import "firebase/database";

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
    }

    init = () => {
        firebase.initializeApp(this.firebaseConfig);
    };

    addItem = async (title, text, date, favourite) => {
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
                favourite
            });

        return newPostKey;
    };

    updateItem = async (id, title, text, date, favourite) => {
        await firebase
            .database()
            .ref("posts/" + id)
            .set({
                title,
                text,
                date,
                favourite
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
}
