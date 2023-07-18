import '../scss/index.css';
import socket from "../services/socket"

function Profile({ close }){

    function enterProfile(){
        var desc = document.getElementById("typeDescription").value;
        var age = document.getElementById("selectAge").value;
        var type = document.getElementById("selectType").value;
        var newProfile = [localStorage.getItem('id'),age,type,desc];
        alert(newProfile)
        socket.emit('setProfile', newProfile);
        close();
    }

    return (
        <div id="profileArea">
            <div 
                id="profileClose" 
                onClick={close} 
                class="h5 fw-bold position-absolute">
                    X
            </div>
            <p class="fw-bold h3 text-black ps-4 pt-2">Edit Profile:</p>
            <div id="profileLine"></div>
            <div id="changeArea">
                <div class="d-flex justify-content-center mt-1">
                    <label for="desc" class="fs-3 text-black">Description:</label>
                    <input type="text" name="desc" id="typeDescription" autocomplete="off" />
                </div>
                <div class="d-flex justify-content-center mt-2">
                    <label for="age" class="fs-3 text-black">Age:</label>
                    <input type="number" name="age" id="selectAge" min="1" />
                    <label for="playType" class="fs-3 text-black ms-4">Play Type:</label>
                    <select id="selectType" name="playType" class="form-select">
                        <option value=""></option>
                        <option value="Competitive">Competitive</option>
                        <option value="Just for Fun">Just for Fun</option>
                    </select>
                    <button 
                        id="enterProfile" 
                        onClick={enterProfile} 
                        class="btn rounded-pill fw-bold text-white">
                            Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile;