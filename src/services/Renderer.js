export const renderPost = (id, title, text, date, favourite = false, author, container) => {
    const starred = favourite ? "post__favourite--active" : "";
    const post = `
    <article class="post" data-id="${id}">
        <div class="post__author">Автор: <span>${author}</span></div>
        <h3 class="post__title">${title}</h3>
        <p class="post__text">${text}</p>
        <div class="post__footer">
            <i class="post__favourite ${starred} fa fa-star" aria-hidden="true"></i>
            <span class="post__date">${date}</span>
        </div>
    </article>
    `;

    container.insertAdjacentHTML("afterbegin", post);
};
