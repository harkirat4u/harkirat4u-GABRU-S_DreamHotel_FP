window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

const list1 = document.querySelector('#ul1');
const user1 = document.querySelector('#user');
const pass1 = document.querySelector('#pass');
// const bname = document.querySelector('#bname');
// const ndays = document.querySelector('#ndays');
const form1 = document.querySelector('#loginform1');
// const addbtn = document.querySelector('#roombtn')
const submitBtn1 = document.querySelector('form button');






let db;
const request = window.indexedDB.open('Registration', 4);
console.log('Database enter');
window.onload = function() {
    // let request = window.indexedDB.open('Registration', 1);


    request.onerror = function() {
        console.log('Database failed to open');
    };

    request.onsuccess = function() {
        console.log('Database opened successfully');

        db = request.result;

        // Run the displayData() function to display the notes already in the IDB
        //displayData();
        //createbtn();
    }

    form1.onsubmit = loginfunction;


    //Login fn

    function loginfunction(e) {
        e.preventDefault();
        let userinput = user.value;
        const request = window.indexedDB.open("Registration", 4);

        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(['Login'], 'readwrite');
            const invStore = transaction.objectStore('Login');
            const cursorRequest = invStore.openCursor();
            cursorRequest.onsuccess = e => {
                const cursor = e.target.result;
                if (cursor) {
                    if (cursor.value.user === userinput) {
                        alert("Welcome:" + cursor.value.user);
                        // createbtn();

                        displayData();
                        console.log('logined');
                        console.log('logined' + cursor.value.user);
                        //  cursor.preventDefault;
                    }
                    // else{
                    //     alert("User Invalid,Please register first")
                    // }
                    cursor.continue();
                    console.log('continue');
                } else {
                    console.log('login-else');
                    //alert("Invalid User/ Please Register first");
                }

            }
            transaction.oncomplete = function() {
                console.log('Transaction completed: database modification finished.');

                // update the display of data to show the newly added item, by running displayData() again.
                // displayData();
            };

            transaction.onerror = function() {
                console.log('Transaction not opened due to error');
            };
        }



    }


    function displayData() {


        // const request = window.indexedDB.open("Registration", 1);
        // // Here we empty the contents of the list element each time the display is updated
        // // If you didn't do this, you'd get duplicates listed each time a new note is added
        while (list1.firstChild) {
            list1.removeChild(list.firstChild);
        }

        // // Open our object store and then get a cursor - which iterates through all the
        // // different data items in the store
        // let objectStore = db.transaction('Login').objectStore('Login');
        // objectStore.openCursor().onsuccess = function(e) {
        //   // Get a reference to the cursor
        //   let cursor = e.target.result;
        //   request.onsuccess = () => {

        const username = user.value;
        //   alert(username);
        const db = request.result;
        const transaction = db.transaction(['Login'], 'readwrite');
        const invStore = transaction.objectStore('Login');
        const vendorIndex = invStore.index('user');
        const keyRng = IDBKeyRange.only(username);
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


                listItem.appendChild(h3);
                listItem.appendChild(para);
                listItem.appendChild(para1);
                listItem.appendChild(para2);
                listItem.appendChild(para3);

                list1.appendChild(listItem);

                // Put the data from the cursor inside the h3 and para
                h3.textContent = cursor.value.user;
                para.textContent = cursor.value.lastname;
                para1.textContent = cursor.value.email;
                para2.textContent = cursor.value.phone;
                para3.textContent = cursor.value.sex;


                cursor.continue();
            } else {
                // Again, if list item is empty, display a 'No notes stored' message
                if (!list1.firstChild) {
                    const listItem = document.createElement('li');
                    listItem.textContent = 'No notes stored.';
                    list.appendChild(listItem);
                }
                // if there are no more cursor items to iterate through, say so
                console.log('Notes all displayed');
            }
        }

    }

};