import Model from "../Model/Model.js";

import "./header.scss";

export default class Header {
    constructor() {
        this.initHeight();
        new Model();
    }

    initHeight = () => {
        const vh = window.innerHeight * 0.01;
        const header = document.querySelector(".header");
        header.style.setProperty("--vh", `${vh}px`);
    };
}
