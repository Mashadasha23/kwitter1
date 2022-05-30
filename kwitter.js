function login(){

    user_name = document.getElementById("User_name").value;
    localStorage.setItem("Name_user", user_name);
window.location="kwitter_room.html";

}