import Firebase from "../../services/Firebase";
import Spinner from "../Spinner/Spinner";

import "./login.scss";

export default class Login {
    constructor() {
        document.body.style.overflow = "hidden";
        this.firebase = new Firebase();
        new Spinner();
        this.form = document.querySelector("form.login");
        this.email = document.querySelector("form.login #email");
        this.password = document.querySelector("form.login #password");
        this.error = document.querySelector("form.login .login__error");

        this.init();
    }

    init = () => {
        this.form.addEventListener("submit", this.formSubmit);
        this.firebase.init();
        this.initHeight();
    };

    initHeight = () => {
        const vh = window.innerHeight * 0.01;
        const login = document.querySelector(".login");
        login.style.setProperty("--vh", `${vh}px`);
    };

    formSubmit = async e => {
        e.preventDefault();

        const email = this.email.value;
        const password = this.password.value;

        this.firebase.signUp(email, password, this.form).catch(err => {
            this.error.textContent = err.message;
            this.error.classList.remove("login__error_hidden");
        });
    };
}
