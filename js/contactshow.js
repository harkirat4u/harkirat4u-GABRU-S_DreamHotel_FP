window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;


const list = document.querySelector('ul');

let db;
window.onload = function() {
    let request = window.indexedDB.open('Contact_db', 5);


    request.onerror = function() {
        console.log('Database failed to open');
    };

    request.onsuccess = function() {
        console.log('Database opened successfully');

        db = request.result;

        // Run the displayData() function to display the notes already in the IDB
        displayData();
    }

    function displayData() {
        // Here we empty the contents of the list element each time the display is updated
        // If you didn't do this, you'd get duplicates listed each time a new note is added
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }

        // Open our object store and then get a cursor - which iterates through all the
        // different data items in the store
        let objectStore = db.transaction('contactos').objectStore('contactos');
        objectStore.openCursor().onsuccess = function(e) {
            // Get a reference to the cursor
            let cursor = e.target.result;

            // If there is still another data item to iterate through, keep running this code
            if (cursor) {
                // Create a list item, h3, and p to put each data item inside when displaying it
                // structure the HTML fragment, and append it inside the list
                const listItem = document.createElement('li');
                const h3 = document.createElement('h3');
                const para = document.createElement('p');
                const para1 = document.createElement('p');
                const para2 = document.createElement('p');
                const para3 = document.createElement('p');


                listItem.appendChild(h3);
                listItem.appendChild(para);
                listItem.appendChild(para1);
                listItem.appendChild(para2);
                listItem.appendChild(para3);

                list.appendChild(listItem);

                // Put the data from the cursor inside the h3 and para
                h3.textContent = cursor.value.user;
                para.textContent = cursor.value.lastname;
                para1.textContent = cursor.value.email;
                para2.textContent = cursor.value.phone;
                para3.textContent = cursor.value.questions;





                // Store the ID of the data item inside an attribute on the listItem, so we know
                // which item it corresponds to. This will be useful later when we want to delete items
                listItem.setAttribute('data-note-id', cursor.value.userid);

                // Create a button and place it inside each listItem
                const deleteBtn = document.createElement('button');
                listItem.appendChild(deleteBtn);
                deleteBtn.textContent = 'Delete';

                // Set an event handler so that when the button is clicked, the deleteItem()
                // function is run
            deleteBtn.onclick = alert("delete pressed");;

                // Iterate to the next item in the cursor
                cursor.continue();
            } else {
                // Again, if list item is empty, display a 'No notes stored' message
                if (!list.firstChild) {
                    const listItem = document.createElement('li');
                    listItem.textContent = 'No notes stored.';
                    list.appendChild(listItem);
                }
                // if there are no more cursor items to iterate through, say so
                console.log('Notes all displayed');
            }
        };
    }

    function deleteItem(e) {
        // retrieve the name of the task we want to delete. We need
        // to convert it to a number before trying it use it with IDB; IDB key
        // values are type-sensitive.
        let noteId = Number(e.target.parentNode.getAttribute('data-note-id'));

        // open a database transaction and delete the task, finding it using the id we retrieved above
        let transaction = db.transaction(['Login'], 'readwrite');
        let objectStore = transaction.objectStore('Login');
        let request = objectStore.delete(noteId);

        // report that the data item has been deleted
        transaction.oncomplete = function() {
            alert("Delete Data ");
            // delete the parent of the button
            // which is the list item, so it is no longer displayed
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
            console.log('Note ' + noteId + ' deleted.');

            // Again, if list item is empty, display a 'No notes stored' message
            if (!list.firstChild) {
                let listItem = document.createElement('li');
                listItem.textContent = 'No notes stored.';
                list.appendChild(listItem);
            }
        };
    }
};
