import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {


    return (
        <nav>
            {
                isSignedIn
                    ? <p onClick={() => onRouteChange("signout")} className="f4 link dim black underline pa3 pointer">Sign out</p>
                    : <>
                        <p onClick={() => onRouteChange("signin")} className="f4 link dim black underline pa3 pointer">Sign in</p>
                        <p onClick={() => onRouteChange("register")} className="f4 link dim black underline pa3 pointer">Register</p>

                    </>
            }
        </nav>
    )
}

export default Navigation;