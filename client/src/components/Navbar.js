import '../scss/index.css';

function Navbar({ home }){
    return (
        <nav id="mainNav" class="navbar navbar-expand-sm text-white">
            <div class="container-fluid">
                <div class="fw-bold h2 mt-1 ms-3">PickupUNL</div>
                <img id="menuLogo" class="me-2 dropdown-toggle" data-bs-toggle="dropdown" src="https://www.freeiconspng.com/thumbs/menu-icon/menu-icon-24.png" />
                <ul class="dropdown-menu dropdown-menu-end">
                    <li>
                        <div 
                            id="searchBtn" 
                            onClick={() => home("search")} 
                            class="dropdown-item">
                                Find Players
                        </div>
                    </li>
                    <li>
                        <div 
                            id="profileBtn" 
                            onClick={() => home("profile")} 
                            class="dropdown-item">
                                Profile
                        </div>
                    </li>
                    <li>
                        <div 
                            id="logoutBtn" 
                            onClick={() => home("logout")} 
                            class="dropdown-item">
                                Logout
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;