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
room_name = localStorage.getItem("room_selected");

document.getElementById("Welcome").innerHTML = "Welcome " +  user_name  + " to #"+ room_name;

function send(){

    my_msg = document.getElementById("new_message").value;

    firebase.database().ref(room_name).push({
        Name : user_name,
        Message : my_msg,
        Likes : 0

    });
 
}


function get_Data(){
    
    firebase.database().ref(room_name).on("value", function(snapshot){

        document.getElementById("output").innerHTML = "";

        snapshot.forEach(
            function(childSnapshot) {
                child_Key  = childSnapshot.key;
                child_value = childSnapshot.val();

                if (child_Key == "purpose") {

                    message_id  = child_Key;
                    message_data = child_value;

                    name_user = message_data['Name'];
                    msg = message_data['Message'];
                    likes = message_data['Likes'];

                    name_tag = "<h4>"+name_user+"</h4>";
                    message_tag = "<h4 class='message_h4'>"+msg+"</h4>";
                    like_button = "<button class = 'btn btn-success' id = "+message_id+"  onclick = 'update_likes(this.id)' value = "+likes+"> Likes : "+likes+"</button> <hr>"



                    row_msg = name_tag + message_tag + like_button;
                    document.getElementById("output").innerHTML = document.getElementById("output").innerHTML + row_msg;
                    
                }


            }
        );



    });

}

get_Data();
  

function update_likes(button_id)
{
  
	old_likes = document.getElementById(button_id).value;
	updated_likes = Number(old_likes) + 1;
	console.log(updated_likes);

	firebase.database().ref(room_name).child(button_id).update({
		Likes: updated_likes  
	 });

}


















function logout(){

    localStorage.removeItem("Name_user");
    localStorage.removeItem("room_selected");

    window.location="index.html";
}





