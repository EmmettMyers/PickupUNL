import { useEffect } from 'react';
import '../scss/App.css';

function ProfileModal({ prof, hideProfile }){

    useEffect(() => {
        if (prof[0].age == 0 && prof[0].description == "" && prof[0].competition == "")
            document.getElementById('profile').style.height = "125px";
    });

    return (
        <div id="profile" className="rounded">
            <div id="close" className="fw-bold h2" onClick={e=>{hideProfile();}}>X</div>
            <div className="d-flex w-100">
                <img id="picture" className="rounded-circle mt-2 ms-3" src={prof[0].picture}></img>
                <div className="ms-3">
                    <div id="name" className="fw-bold text-white h2">{prof[0].user}</div>
                    <div id="email" className="text-white fs-6">{prof[0].email}</div>
                </div>
            </div>
            <div className="d-flex justify-content-evenly mt-2">
                {prof[0].age != 0 && 
                    <div id="age" className="text-white fs-6">
                        Age:&emsp;{prof[0].age}
                    </div>
                }
                {prof[0].competition && 
                    <div id="competition" className="text-white fs-6">
                        Play Type:&emsp;{prof[0].competition}
                    </div>
                }
            </div>
            {prof[0].description && <div id="line"></div>}
            {prof[0].description && <div id="description" className="mt-2 ms-2 text-white fs-6">{prof[0].description}</div>}
      </div>
    );
}

export default ProfileModal;