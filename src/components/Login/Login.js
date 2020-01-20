import Firebase from "../../services/Firebase";
import Spinner from "../Spinner/Spinner";

import "./login.scss";

export default class Login {
    constructor() {
        this.firebase = new Firebase();
        new Spinner();
        this.form = document.querySelector("form.login");
        this.email = document.querySelector("form.login #email");
        this.password = document.querySelector("form.login #password");
        this.error = document.querySelector("form.login .login__error");
        this.login = document.querySelector("form.login .login__btn_login");

        this.init();
    }

    init = () => {
        this.form.addEventListener("submit", this.formSubmit);
        this.login.addEventListener("click", this.loginClickHandler);
        this.firebase.init();
    };

    formSubmit = async e => {
        e.preventDefault();

        const email = this.email.value;
        const password = this.password.value;

        this.firebase.signUp(email, password).catch(err => {
            this.error.textContent = err.message;
            this.error.classList.remove("login__error_hidden");
        });
    };

    loginClickHandler = async () => {
        const email = this.email.value;
        const password = this.password.value;

        this.firebase.logIn(email, password).catch(err => {
            this.error.textContent = err.message;
            this.error.classList.remove("login__error_hidden");
        });
    };
}
