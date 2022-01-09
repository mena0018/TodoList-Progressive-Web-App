/**
 * RÃ©cupÃ©ration des todos de l'API et insertion dans la page web
 */
 function getTodos() {
    console.log('get todos request');

    clearTodos();

    fetchTodos().then(todos => {
        todos.forEach(todo => appendTodoHtml(todo));
    });
}

/**
 * Ajout d'un todo dans l'API contenant le text prÃ©cisÃ© puis ajout dans la page web
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
 * Basculement du todo identifiÃ© par id d'un Ã©tat rÃ©alisÃ© Ã  un Ã©tat non rÃ©alisÃ© ou inversement dans l'API puis dans la page web
 * @param {number} id identifie le todo
 * @param {boolean} done Ã©tat initial du todo
 */
    function toggleTodo(id, done) {
    console.log('Toggle todo ' + id + ' request');

    fetchToggleTodo(id, !done)
        .then(data => toggleTodoHtml(id, data.done));
}

/**
 * Suppression du todo identifiÃ© par id de l'API puis de la page web
 * @param {number} id du todo Ã  supprimer
 * @param {Event} event dÃ©clenchÃ© par le clic sur le bouton de suppression
 */
    function deleteTodo(id, event) {
    console.log('Delete todo ' + id + ' request');

    fetchDeleteTodo(id)
        .then(() => deleteTodoHtml(id));
}