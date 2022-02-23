
import "./Logo.css"
import brain from "./brain.png"
import Tilt from 'react-parallax-tilt';

const Logo = () => {
    return (
        <div className="br2 center tilt ">
            <div className="tilt-inner pa1 o-10" >
                <img alt="logo" src={brain}></img>
            </div>
        </div>
    )
}

export default Logo;