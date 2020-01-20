import "./spinner.scss";

export default class Spinner {
    constructor() {
        this.initHeight();
    }

    initHeight = () => {
        const vh = window.innerHeight * 0.01;
        const auth = document.querySelector(".auth");
        auth.style.setProperty("--vh-auth", `${vh}px`);
    };
}
