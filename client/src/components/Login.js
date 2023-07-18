import { signin } from "../services/authentication";
import '../scss/index.css';

function Login(){
    return (
        <div id="login">
            <img id="backgroundImg" src="https://crec.unl.edu/images/facilities/rwc/rwc_outside_sandvolleyball(1).jpg" />
            <div id="loginContainer">
                <div class="text-white fw-bold title">PickupUNL</div>
                <div class="text-white access">Use Google to access</div>
                <img 
                    onClick={signin}
                    id="google" 
                    src="https://www.oncrashreboot.com/images/create-apple-google-signin-buttons-quick-dirty-way-google.png" 
                />
            </div>
        </div>
    );
}

export default Login;