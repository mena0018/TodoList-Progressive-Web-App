/**
 * Vide la page des todos existant puis parcourt les nouveaux todos pour les ajouter dans la page web
 */
 function updatePage(todos) {
    clearTodos();
    todos.forEach(todo => {
        appendTodoHtml(todo);
    });
}

/**
 * Recuperation des todos de l'API et insertion dans la page web
 */
 function getTodos() {
    var networkDataReceived = false;

    startSpinner();

   // Requête à l'API pour récupérer les dernières données
    var networkUpdate = fetchTodos().then(function(data) {
        networkDataReceived = true;
        updatePage(data);
       
    }).catch(() =>
        // la liste des tâches n’a pas pu être obtenue => Mode Hors Ligne
        setOfflineMode())
    
    // Va chercher les données dans le cache
    caches.match(apiUrl)
      .then(function(response) {
            if (!response) throw Error("No data");

            return response.json();
    }).then(function(data) {
        // Ne pas écraser les données réseau les plus récentes
        if (!networkDataReceived) {
            updatePage(data);
        }
    }).catch(function() {
        // Nous n'avons pas obtenu de données en cache, le réseau est notre dernier espoir :
        return networkUpdate;
    }).catch((error) => showErrorMessage())
      .then(stopSpinner); 
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
        })
        .catch(() =>
        // => Mode Hors Ligne
        setOfflineMode());
}

/**
 * Basculement du todo identifie par id d'un etat realise a  un etat non realise ou inversement dans l'API puis dans la page web
 * @param {number} id identifie le todo
 * @param {boolean} done etat initial du todo
 */
function toggleTodo(id, done) {
    console.log('Toggle todo ' + id + ' request');

    fetchToggleTodo(id, !done)
        .then(data => toggleTodoHtml(id, data.done))
        .catch(() =>
        // => Mode Hors Ligne
        setOfflineMode());
}

/**
 * Suppression du todo identifie par id de l'API puis de la page web
 * @param {number} id du todo a  supprimer
 * @param {Event} event declenche par le clic sur le bouton de suppression
 */
function deleteTodo(id, event) {
    console.log('Delete todo ' + id + ' request');

    fetchDeleteTodo(id)
        .then(() => deleteTodoHtml(id))
        .catch(() => 
            // => Mode Hors Ligne
            setOfflineMode()
        )
}

/**
 * Permet de re-tenter de télécharger les tâches avec un boutton.
 * Effectue une requète sur la liste des tâches et en cas de succès,
 * met à jour la page avec les nouvelles données. En cas d'échec,
 * informe l’utilisateur en réaffichant la bannière.
 */
function tryDataRequest() {
    fetchTodos()
        .then(function(data) {
            setOnlineMode();
            updatePage(data)
        })
        .catch(setOfflineMode)
}
