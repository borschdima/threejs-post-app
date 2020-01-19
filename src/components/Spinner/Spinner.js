import "./spinner.scss";

export default class Spinner {
    constructor() {
        this.initHeight();
    }

    initHeight = () => {
        const vh = window.innerHeight * 0.01;
        const spinner = document.querySelector(".spinner");
        spinner.style.setProperty("--vh", `${vh}px`);
    };
}
