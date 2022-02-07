const todosContainer = document.querySelector("section.todos");
const spinner = document.querySelector(".spinner");

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
    trash.className = 'material-icons';
    trash.value = "delete";

    trash.addEventListener('click', (event) => {
        event.stopPropagation();

        deleteTodo(id,event)
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

/**
 * Démarre un indicateur d’activité (Progress indicators, spinner, message, …)
 */
function startSpinner() {
    console.log("Chargement en cours");
}

/**
 * Arrête un indicateur d’activité (Progress indicators, spinner, message, …)
 */
function stopSpinner() {
    console.log("Done !");    
    spinner.classList.add("hidden")
}

/**
 * Fonction qui sera appelée lorsque aucune donnée n’a pu être récupérée, 
 * ni du cache, ni du réseau. Un console.log() ou une alert suffira pour l’instant.
 */
function showErrorMessage()
{
    const MDCDialog = mdc.dialog.MDCDialog;
    const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));
    dialog.open()
}

// Bouton permettant à l’utilisateur de tester par lui-même un retour de l’accès aux données
const testConection = document.getElementsByName('btn-test')[0];
testConection.addEventListener('click', () => {
    tryDataRequest()
})

/**
 * Déclenche l’affichage d’une bannière qui indiquera à l’utilisateur que l’api n’est pas 
 *  accessible et que les tâches affichées peuvent ne pas représenter la réalité.
 */
function setOfflineMode()
{
    const MDCBanner = mdc.banner.MDCBanner;
    const banner = new MDCBanner(document.querySelector('.mdc-banner'));
    banner.open()

    // Désactive toutes les modifications possibles sur les tâches
    disabledTodoActions()
}

/**
 * Désactive toutes les modifications possibles sur les tâches (ajout,
 *  suppression, modification) en désactivant les actions concernés
 */
function disabledTodoActions()
{
    const trashes = document.getElementsByName("trash");
    trashes.forEach(trash => {
        trash.setAttribute('disabled', true)
    })
    const sendTodo = document.getElementsByName("send-todo")[0];
    sendTodo.setAttribute('disabled', true);
}

/**
 * Déclenche l’affichage d’une bannière qui indiquera à l’utilisateur du retour du réseau 
 * à l’aide d’un composant Snackbars avant de repasser l’application en mode “en ligne”
 * en réactivant toutes les fonctionnalités sur les tâches.
 */
 function setOnlineMode()
 {
     // Affichage de la Snackbar
     const MDCSnackbar = mdc.snackbar.MDCSnackbar;
     const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
     snackbar.open()

     // Re-passage de l'application en mode en ligne, en réactivant les actions
     const trashes = document.getElementsByName("trash");
     trashes.forEach(trash => {
         trash.setAttribute('disabled', false)
     })
     const sendTodo = document.getElementsByName("send-todo")[0];
     sendTodo.disabled = false;

     // Suppression du bouton de test
     const testConection = document.getElementsByName('btn-test')[0];
     testConection.classList.add('hidden');
 }