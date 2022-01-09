const apiUrl = 'http://localhost:7000/todos/';

/**
 * Requete de recuperation de l'ensemble des todos de l'API
 * @returns une promesse contenant le tableau des todos
 */
function fetchTodos() {
    return fetch(apiUrl)
        .then(resp => resp.json());
}

/**
 * Requete sur l'API de suppression du todo id
 * @param {number} id 
 * @returns une promesse resolue a  la suppression en BD
 */
function fetchDeleteTodo(id) {
    return fetch(apiUrl + id, {
        method: 'DELETE'
    });
}

/**
 * Requete sur l'API de basculement de l'etat du todo id vers le statut done
 * @param {number} id 
 * @param {*} done etat du todo
 * @returns une promesse resolue a  la mise a  jour du todo contenant les donnees du todo modifie
 */
function fetchToggleTodo(id, done) {
    return fetch(apiUrl + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            id,
            done
        }),
    })
        .then(resp => resp.json());
}

/**
 * Requete d'ajout d'un todo dans la BD avec le text precise
 * @param {string} text 
 * @returns une promesse resolue a  l'ajout du todo dans la BD, contenant les donnees du todo ajoute
 */
function fetchAddTodo(text) {
    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            text: text,
            done: false,
        }),
    })
        .then(resp => resp.json())
}