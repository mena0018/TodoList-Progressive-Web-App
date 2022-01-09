const apiUrl = 'http://localhost:7000/todos/';

/**
 * RequÃªte de rÃ©cupÃ©ration de l'ensemble des todos de l'API
 * @returns une promesse contenant le tableau des todos
 */
function fetchTodos() {
    return fetch(apiUrl)
        .then(resp => resp.json());
}

/**
 * RequÃªte sur l'API de suppression du todo id
 * @param {number} id 
 * @returns une promesse rÃ©solue Ã  la suppression en BD
 */
function fetchDeleteTodo(id) {
    return fetch(apiUrl + id, {
        method: 'DELETE'
    });
}

/**
 * RequÃªte sur l'API de basculement de l'Ã©tat du todo id vers le statut done
 * @param {number} id 
 * @param {*} done Ã©tat du todo
 * @returns une promesse rÃ©solue Ã  la mise Ã  jour du todo contenant les donnÃ©es du todo modifiÃ©
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
 * RequÃªte d'ajout d'un todo dans la BD avec le text prÃ©cisÃ©
 * @param {string} text 
 * @returns une promesse rÃ©solue Ã  l'ajout du todo dans la BD, contenant les donnÃ©es du todo ajoutÃ©
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