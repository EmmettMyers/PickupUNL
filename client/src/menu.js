import React from 'react';
import ReactDOM from 'react-dom/client';
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:5000");

document.getElementById("searchBtn").addEventListener("click", function() {
    document.getElementById("profileArea").style.display = "none";
    document.getElementById("search").style.display = "block";
});

document.getElementById("searchClose").addEventListener("click", function() {
    document.getElementById("search").style.display = "none";
    document.getElementById("resultArea").style.display = "none";
    document.getElementById("noResults").style.display = "none";
    document.getElementById("selectSport").value = "";
    document.getElementById("selectTime").value = "";
    document.getElementById("selectSetting").value = "";
});

document.getElementById("enterSearch").addEventListener("click", function() {
    var sport = document.getElementById("selectSport").value;
    var time = document.getElementById("selectTime").value;
    var setting = document.getElementById("selectSetting").value;
    var searchParams = [sport, time, setting];
    socket.emit('search', searchParams);
});

socket.on('getSearch', places => {
    if (places == ""){
        document.getElementById("noResults").style.display = "block";
        document.getElementById("resultArea").style.display = "none";
    }
    else {
        document.getElementById("noResults").style.display = "none";
        document.getElementById("resultArea").style.display = "block";
        const results = ReactDOM.createRoot(document.getElementById('insertResults'));
        results.render(
            <div>
                {places.map(place => <Result name={place[0]} time={place[1]} sport={place[2]}/>)}
            </div>
        );
    }
});

function Result(place){
    var time = place.time.charAt(0)+":00 "+place.time.slice(-1).toUpperCase()+".M.";
    var sport = place.sport.charAt(0).toUpperCase() + place.sport.slice(1);
    return (
        <div class="d-flex justify-content-evenly result">
            <div class="fs-6 text-center">{place.name}</div>
            <div class="fs-6 text-center">{time}</div>
            <div class="fs-6 text-center">{sport}</div>
        </div>
    );
}

document.getElementById("profileBtn").addEventListener("click", function() {
    document.getElementById("search").style.display = "none";
    document.getElementById("profileArea").style.display = "block";
});

document.getElementById("profileClose").addEventListener("click", function() {
    document.getElementById("profileArea").style.display = "none";
});

document.getElementById("enterProfile").addEventListener("click", function() {
    var desc = document.getElementById("typeDescription").value;
    var age = document.getElementById("selectAge").value;
    var type = document.getElementById("selectType").value;
    var newProfile = [localStorage.getItem('id'),age,type,desc];
    socket.emit('setProfile', newProfile);
    document.getElementById("profileArea").style.display = "none";
});

document.getElementById("logoutBtn").addEventListener("click", function() {
    localStorage.setItem("user", "");
    document.getElementById("login").style.display = "block"; 
});

var clicks = 0;
document.getElementById("menuLogo").addEventListener("click", function() {
  clicks = 0;
  if (this.className.includes("active"))
    this.className = this.className.substring(0,this.className.indexOf("active"));
  else
    this.className += " active";
});
document.body.addEventListener("click", function() {
  var menu = document.getElementById("menuLogo");
  if (menu.className.includes("active") && clicks > 0)
    menu.className = menu.className.substring(0,menu.className.indexOf("active"));
  clicks++;
});