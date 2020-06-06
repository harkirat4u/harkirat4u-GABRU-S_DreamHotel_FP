window.indexedDB = window.indexedDB|| window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;



const Fname = document.querySelector('#fName');
const Lname = document.querySelector('#lName');
const email = document.querySelector('#email');
const phone = document.querySelector('#phone');

const questions = document.querySelector('#questions');
const contactform = document.querySelector('#contactform');
const submitBtncontact = document.querySelector('form button');
let db;
window.onload = function() {
    let request = window.indexedDB.open('Contact_db', 2);


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
        let objectStore = db.createObjectStore('contactos', { keyPath: 'userid', autoIncrement:true });
      
        // Define what data items the objectStore will contain
        objectStore.createIndex('user', 'user', { unique: false });
        objectStore.createIndex('pass', 'pass', { unique: false });
        objectStore.createIndex('email', 'email', { unique: false });
        objectStore.createIndex('phone', 'phone', { unique: false });
        
        objectStore.createIndex('questions', 'questions', { unique: false });
      
        console.log('Database setup complete');
      };


    contactform.onsubmit = addDatacontact;


      function addDatacontact(e) {
        // prevent default - we don't want the form to submit in the conventional way
        e.preventDefault();
      
        // grab the values entered into the form fields and store them in an object ready for being inserted into the DB
        let newItem = { user: Fname.value, lastname: Lname.value ,email:email.value,phone:phone.value,questions:questions.value};
      
        // open a read/write db transaction, ready for adding the data
        let transaction = db.transaction(['contactos'], 'readwrite');
      
        // call an object store that's already been added to the database
        let objectStore = transaction.objectStore('contactos');
      
        // Make a request to add our newItem object to the object store
        let request = objectStore.add(newItem);
        request.onsuccess = function() {
          // Clear the form, ready for adding the next entry
          Fname.value = '';
          Lname.value = '';
          email.value = '';
          phone.value = '';
          
          questions.value = '';
        };
      
        // Report on the success of the transaction completing, when everything is done
        transaction.oncomplete = function() {
          console.log('Transaction completed: database modification finished.');
          alert("Submitted Succesfully");
          // update the display of data to show the newly added item, by running displayData() again.
    
        };
      
        transaction.onerror = function() {
            alert("There is an technical error");
          console.log('Transaction not opened due to error');
        };
      }



  
};



