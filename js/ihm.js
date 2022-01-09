const todosContainer = document.querySelector("section.todos");

/**
 * Apres le chargement de la page
 */
window.addEventListener('load', () => {
    getTodos();

    const formAdd = document.forms['addTodo'];    
    formAdd.addEventListener('submit', event => {
        event.preventDefault();
        const text = formAdd.todo.value;
        if (text) {
            formAdd.todo.value = '';

            addTodo(text);
        }
    });
});

/**
 * Ajout d'un todo dans la page web
 * @param {{id, done, text}} todo a  ajouter dans la page web
 */
function appendTodoHtml(todo) {
    const article = document.createElement('article');
    const span = document.createElement('span');
    span.innerText = todo.text;
    article.appendChild(span);
    article.id = 'article' + todo.id;

    article.appendChild(createTrashButton(todo.id));

    if (todo.done) {
        article.classList.add('done');
    }

    article.addEventListener('click', () => toggleTodo(todo.id, article.classList.contains('done')));

    todosContainer.appendChild(article);
}

/**
 * Supprime tous les fils d'un element HTML
 * @param {htmlElement} htmlElement 
 */
function emptyElement(htmlElement) {
    while (htmlElement.firstChild) {
        htmlElement.removeChild(htmlElement.firstChild);
    }
}

/**
 * Supprime tous les articles du DIV todosContainer
 */
function clearTodos() {
    emptyElement(todosContainer);
}

/**
 * Creation d'un bouton de type 'poubelle' declenchant la suppression du todo identifie par id
 * @param {number} id du todo a supprimer
 * @returns l'element HTML correspondant au bouton cree
 */
function createTrashButton(id) {
    const trash = document.createElement('input');
    trash.type = 'button';
    trash.name = 'trash';
    trash.value = 'X';

    trash.addEventListener('click', (event) => {
        event.stopPropagation();

        deleteTodo(id, event);
    });
    
    return trash;
}

/**
 * Suppression du todo de la page web
 * @param {number} id 
 */
function deleteTodoHtml(id) {
    const article = document.querySelector('#article'+id);
    todosContainer.removeChild(article);
}

/**
 * Met a  jour l'etat du todo id dans la page web
 * @param {number} id identifiant du todo
 * @param {boolean} done etat du todo
 */
function toggleTodoHtml(id, done) {
    const article = document.querySelector('#article'+id);
    article.classList.toggle('done', done);
}