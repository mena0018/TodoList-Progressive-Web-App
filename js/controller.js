/**
 * Recuperation des todos de l'API et insertion dans la page web
 */
 function getTodos() {
    console.log('get todos request');

    clearTodos();

    fetchTodos().then(todos => {
        todos.forEach(todo => appendTodoHtml(todo));
    });
}

/**
 * Ajout d'un todo dans l'API contenant le text precise puis ajout dans la page web
 * @param {string} text 
 */
 function addTodo(text) {
    console.log('Add todo : ', text);

    fetchAddTodo(text)
        .then(data => {
            appendTodoHtml(data);
        });
}

/**
 * Basculement du todo identifie par id d'un etat realise a  un etat non realise ou inversement dans l'API puis dans la page web
 * @param {number} id identifie le todo
 * @param {boolean} done etat initial du todo
 */
    function toggleTodo(id, done) {
    console.log('Toggle todo ' + id + ' request');

    fetchToggleTodo(id, !done)
        .then(data => toggleTodoHtml(id, data.done));
}

/**
 * Suppression du todo identifie par id de l'API puis de la page web
 * @param {number} id du todo a  supprimer
 * @param {Event} event declenche par le clic sur le bouton de suppression
 */
    function deleteTodo(id, event) {
    console.log('Delete todo ' + id + ' request');

    fetchDeleteTodo(id)
        .then(() => deleteTodoHtml(id));
}