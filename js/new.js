window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;


const list = document.querySelector('#registerul');
const Fname = document.querySelector('#fName');
const Lname = document.querySelector('#lName');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');
const male = document.querySelector('#male');
const female = document.querySelector('#other');
const form = document.querySelector('#regform');
const submitBtn = document.querySelector('form button');
let db;
window.onload = function() {
    let request = window.indexedDB.open('Registration', 4);


    request.onerror = function() {
        console.log('Database failed to open');
    };

    request.onsuccess = function() {
        console.log('Database opened successfully');

        db = request.result;

        // Run the displayData() function to display the notes already in the IDB
        //displayData();
    }


    request.onupgradeneeded = function(e) {
        // Grab a reference to the opened database
        let db = e.target.result;

        // Create an objectStore to store our notes in (basically like a single table)
        // including a auto-incrementing key
        let objectStore = db.createObjectStore('Login', { keyPath: 'userid', autoIncrement: true });

        // Define what data items the objectStore will contain
        objectStore.createIndex('user', 'user', { unique: false });
        objectStore.createIndex('pass', 'pass', { unique: false });
        objectStore.createIndex('email', 'email', { unique: false });
        objectStore.createIndex('phone', 'phone', { unique: false });
        objectStore.createIndex('bname', 'bname', { unique: false });
        objectStore.createIndex('ndays', 'ndays', { unique: false });
        objectStore.createIndex('room', 'room', { unique: false });
        objectStore.createIndex('person', 'person', { unique: false });
        objectStore.createIndex('other', 'other', { unique: false });


        console.log('Database setup complete');
    };


    form.onsubmit = addData;


    function addData(e) {
        // prevent default - we don't want the form to submit in the conventional way
        e.preventDefault();

        // grab the values entered into the form fields and store them in an object ready for being inserted into the DB
        let newItem = { user: Fname.value, lastname: Lname.value, email: email.value, phone: phone.value, bname: '', ndays: '', room: '', person: '', other: '', };

        // open a read/write db transaction, ready for adding the data
        let transaction = db.transaction(['Login'], 'readwrite');

        // call an object store that's already been added to the database
        let objectStore = transaction.objectStore('Login');

        // Make a request to add our newItem object to the object store
        let request = objectStore.add(newItem);
        request.onsuccess = function() {
            // Clear the form, ready for adding the next entry
            Fname.value = '';
            Lname.value = '';
            email.value = '';
            phone.value = '';

        };

        // Report on the success of the transaction completing, when everything is done
        transaction.oncomplete = function() {
            console.log('Transaction completed: database modification finished.');
            alert("Registered Succesfully");
            // update the display of data to show the newly added item, by running displayData() again.
            displayData();
            alert('registered');
        };

        transaction.onerror = function() {
            alert("There is an technical error");
            console.log('Transaction not opened due to error');
        };
    }


    function displayData() {


        // const request = window.indexedDB.open("Registration", 1);
        // // Here we empty the contents of the list element each time the display is updated
        // // If you didn't do this, you'd get duplicates listed each time a new note is added
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }


        const request = window.indexedDB.open("Registration", 4);
        request.onsuccess = () => {

            let username1 = user.value;
            alert(username);
            const db = request.result;
            const transaction = db.transaction(['Login'], 'readwrite');
            const invStore = transaction.objectStore('Login');
            const vendorIndex = invStore.index('user');
            const keyRng = IDBKeyRange.only(username1);
            const cursorRequest = vendorIndex.openCursor(keyRng);
            cursorRequest.onsuccess = e => {


                const cursor = e.target.result;
                if (cursor) {
                    // alert(cursor.value.user);
                    // const invoice = cursor.value;
                    // invoice.vendor = 'P&GE';
                    // const updateRequest = cursor.update(invoice);
                    const listItem = document.createElement('li');
                    const h3 = document.createElement('h3');
                    const para = document.createElement('p');
                    const para1 = document.createElement('p');
                    const para2 = document.createElement('p');
                    const para3 = document.createElement('p');
                    const para4 = document.createElement('p');


                    listItem.appendChild(h3);
                    // listItem.appendChild(para);
                    // listItem.appendChild(para1);
                    // listItem.appendChild(para2);
                    listItem.appendChild(para3);
                    listItem.appendChild(para4);
                    list1.appendChild(listItem);

                    // Put the data from the cursor inside the h3 and para
                    h3.textContent = "Welcome-:" + cursor.value.user;
                    para3.textContent = "Lastname-" + cursor.value.lastname;
                    para2.textContent = "Phone-" + cursor.value.email;
                    para4.textContent = "Phone-" + cursor.value.phone;

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
            }

        }

    }
};