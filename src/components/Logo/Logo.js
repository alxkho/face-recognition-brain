
import "./Logo.css"
import brain from "./brain.png"
import Tilt from 'react-parallax-tilt';

const Logo = () => {
    return (
        <Tilt className="br2 shadow-2 tilt">
            <div className="Tilt-inner pa1" >
                <img alt="logo" src={brain}></img>
            </div>
        </Tilt>
    )
}

export default Logo;