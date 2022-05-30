
//ADD YOUR FIREBASE LINKS HERE
var firebaseConfig = {
      apiKey: "AIzaSyDuQwEAL8doHhBIFE7XQs0wVbMs2MRHg3Y",
      authDomain: "kwitter-d9129.firebaseapp.com",
      databaseURL: "https://kwitter-d9129-default-rtdb.firebaseio.com",
      projectId: "kwitter-d9129",
      storageBucket: "kwitter-d9129.appspot.com",
      messagingSenderId: "487296534692",
      appId: "1:487296534692:web:61a0b3ca57acb17fe83e31"
    };
    
    // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

   user_name = localStorage.getItem("Name_user");
   document.getElementById("Welcome").innerHTML = "Welcome " +  user_name;
   
    function add_room(){

          room_new = document.getElementById("new_room").value;

          firebase.database().ref("/").child(room_new).update({
                purpose: "adding new Room"
          });
          
          localStorage.setItem("room_selected", room_new);
          window.location = "kwitter_page.html";
      
     
    }
   


function getData() {
      firebase.database().ref("/").on('value', function(snapshot) {

            document.getElementById("output").innerHTML = "";
            
            snapshot.forEach(function(childSnapshot) {
                  childKey  = childSnapshot.key;
                  Room_names = childKey;
            //Start code
                  new_row_room = "<div class = 'room_name' id = " + Room_names +" onclick = 'redirect_room(this.id)'> #" + Room_names +"</div> <hr>"


            document.getElementById("output").innerHTML += new_row_room;
            //End code
            });
      });
}
getData();
 

function redirect_room(selected_room){
      
      localStorage.setItem("room_selected", selected_room);
      window.location = "kwitter_page.html";
   
} 


function logout(){

      localStorage.removeItem("Name_user");

      window.location="index.html";
}