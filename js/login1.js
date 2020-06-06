
window.indexedDB = window.indexedDB|| window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

const list1 = document.querySelector('#ul1');
const user1 = document.querySelector('#user');
const pass1 = document.querySelector('#pass');
const bname1 = document.querySelector('#bname1');
const ndays1 = document.querySelector('#ndays1');
const form1 = document.querySelector('#loginform');
const form2 = document.querySelector('#selected');
const addbtn = document.querySelector('#roombtn')
const submitBtn1 = document.querySelector('form button');

function showLogin() {
  var lform = document.getElementById("selectdata");
  lform.style.display = 'inline';
}


function getRadioVal(form, name) {
  var val;
  // get list of radio buttons with specified name
  var radios = form.elements[name];
  
  // loop through list of radio buttons
  for (var i=0, len=radios.length; i<len; i++) {
      if ( radios[i].checked ) { // radio checked?
          val = radios[i].value; // if so, hold its value in val
          break; // and break out of for loop
      }
  }
  return val; // return value of checked radio or undefined if none checked
}






let db;
const request = window.indexedDB.open('Registration', 3);
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
      form2.onsubmit = displayData2;

      //Login fn

      function loginfunction(e){
        e.preventDefault();
        let userinput=user1.value;
        let passt=pass1.value;
        // alert(userinput+""+passt);
        const request = window.indexedDB.open("Registration", 3);
       
        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(['Login'], 'readwrite');
            const invStore = transaction.objectStore('Login');
            const cursorRequest = invStore.openCursor();
            cursorRequest.onsuccess = e => {
                const cursor = e.target.result;
                if (cursor) 
                {
                    if (cursor.value.user == userinput && cursor.value.phone == passt) {
                      alert("Welcome-:"+cursor.value.user)
                      showLogin();
                     displayData()
                      console.log('logined');
                      console.log('logined'+cursor.value.user);
                     cursor.preventDefault;
                    }
                    // else {
                    //   alert("User Invalid,Please register first")
                    //     }
                    
                    else if(!cursor.value.user == userinput && !cursor.value.phone == passt){
                           cursor.continue();
                    }
                  

                    else{
                      console.log('login-else');

                      alert("Invalid User/ Please Register first");
                  }
                  }
                else{
                    console.log('login-else');
                    alert("Invalid User/ Please Register first");
                }
               
            }
            transaction.oncomplete = function() {
                console.log('Transaction completed: database modification finished.');
            
                // update the display of data to show the newly added item, by running displayData() again.
                displayData2();
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
      list1.removeChild(list1.firstChild);
    }
  
 
        const username=user.value;

    //  alert(username);
        const db = request.result;
        const transaction = db.transaction(['Login'], 'readwrite');
        const invStore = transaction.objectStore('Login');
        const vendorIndex = invStore.index('user');
        const keyRng = IDBKeyRange.only(username);
        const cursorRequest = vendorIndex.openCursor(keyRng);
        cursorRequest.onsuccess = e => {

           
            const cursor = e.target.result;
            if (cursor) {
             
                const listItem = document.createElement('li');
                const h3 = document.createElement('h3');
                const para = document.createElement('p');
                const para1 = document.createElement('p');
                const para2 = document.createElement('p');
                const para3= document.createElement('p');
                const para4= document.createElement('p');
              
          
                listItem.appendChild(h3);
                 listItem.appendChild(para);
                listItem.appendChild(para1);
                listItem.appendChild(para2);
                listItem.appendChild(para3);
                listItem.appendChild(para4);
                list1.appendChild(listItem);
          
                // Put the data from the cursor inside the h3 and para
                h3.textContent = "Welcome-:"+cursor.value.user;
                para.textContent="Room-: "+cursor.value.room;
                para1.textContent="Persons-: "+cursor.value.person;
                para2.textContent="Other Services-: "+cursor.value.other;
                para3.textContent = "Booking-: "+cursor.value.bname;
                para4.textContent = "days-: "+cursor.value.ndays;
    
                cursor.continue();
            }
        

      else {
        // Again, if list item is empty, display a 'No notes stored' message
        if(!list1.firstChild) {
          const listItem = document.createElement('li');
          listItem.textContent = 'No notes stored.';
          list.appendChild(listItem);
        }
        // if there are no more cursor items to iterate through, say so
        console.log('Notes all displayed');
      }
    }
    
  }



    function displayData2(e) {
      var radioroom = getRadioVal( document.getElementById('selected'), 'room' );
      var radioperson = getRadioVal( document.getElementById('selected'), 'person' );
      var radioother = getRadioVal( document.getElementById('selected'), 'other' );
     
      e.preventDefault();
      const request = window.indexedDB.open("Registration", 3);
    request.onsuccess = () => {
         
          const username=user.value;
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
                  alert("data added");
                  const invoice = cursor.value;
                  invoice.bname = bname1.value;
                  invoice.ndays = ndays1.value;
                  invoice.room = radioroom;
                  invoice.person = radioperson;
                  invoice.other = radioother;
                  displayData();
                  const updateRequest = cursor.update(invoice);

      
                  cursor.continue();
              }
          
  
        else {
          // Again, if list item is empty, display a 'No notes stored' message
         
          }

          // if there are no more cursor items to iterate through, say so
          console.log('dispay2');
        }
        transaction.oncomplete = function() {
          console.log('Transaction completed: database modification finished.');
      
          // update the display of data to show the newly added item, by running displayData() again.
          //displayData();
        };
      
        transaction.onerror = function() {
          console.log('Transaction not opened due to error');
        };
  
      }
      
    }




  
    };
  
