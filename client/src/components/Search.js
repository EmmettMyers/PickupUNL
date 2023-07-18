import { useState } from 'react';
import '../scss/index.css';
import ReactDOM from 'react-dom/client';
import socket from "../services/socket"
import Result from "./Result";

function Search({ close }){
    const [places, setPlaces] = useState("");

    socket.on('getSearch', places => {
        setPlaces(places);
    });
    
    function enterSearch() {
        var sport = document.getElementById("selectSport").value;
        var time = document.getElementById("selectTime").value;
        var setting = document.getElementById("selectSetting").value;
        var searchParams = [sport, time, setting];
        socket.emit('search', searchParams);
    }

    return (
        <div id="search">
            <div id="container" class="d-flex justify-content-center">
                <p class="fw-bold h3 mt-2 text-black">Find Players:</p>
                <select id="selectSport" class="form-select">
                    <option value="">Sport</option>
                    <option value="basketball">Basketball</option>
                    <option value="football">Football</option>
                    <option value="volleyball">Volleyball</option>
                    <option value="soccer">Soccer</option>
                    <option value="baseball">Baseball</option>
                    <option value="tennis">Tennis</option>
                </select>
                <select id="selectTime" class="form-select">
                    <option value="">Time</option>
                    <option value="7a">7:00 A.M.</option>
                    <option value="8a">8:00 A.M.</option>
                    <option value="9a">9:00 A.M.</option>
                    <option value="10a">10:00 A.M.</option>
                    <option value="11a">11:00 A.M.</option>
                    <option value="12p">12:00 P.M.</option>
                    <option value="1p">1:00 P.M.</option>
                    <option value="2p">2:00 P.M.</option>
                    <option value="3p">3:00 P.M.</option>
                    <option value="4p">4:00 P.M.</option>
                    <option value="5p">5:00 P.M.</option>
                    <option value="6p">6:00 P.M.</option>
                    <option value="7p">7:00 P.M.</option>
                    <option value="8p">8:00 P.M.</option>
                </select>
                <select id="selectSetting" class="form-select">
                    <option value="">Setting</option>
                    <option value="in">Indoor</option>
                    <option value="out">Outdoor</option>
                </select>
                <button 
                    onClick={enterSearch}
                    id="enterSearch" 
                    class="btn rounded-pill fw-bold">
                        Search
                </button>
                <div 
                    onClick={close}
                    id="searchClose" 
                    class="h5 fw-bold position-absolute">
                        X
                </div>
            </div>
            {places && places.length > 0 &&
                <div id="resultArea">
                    <div class="fw-bold h5 mt-2 ms-4">Search Results:</div>
                    <div class="d-flex justify-content-evenly titles">
                        <div>Place</div>
                        <div>Time</div>
                        <div>Sport</div>
                    </div>
                    <div id="insertResults">
                        {places.map(place => <Result name={place[0]} time={place[1]} sport={place[2]}/>)}
                    </div>
                </div>
            }
            {places && places.length == 0 &&
                <div id="noResults">
                    <div class="p-2 text-center text-black">No players found from search</div>
                </div>
            }
        </div>
    );
}

export default Search;