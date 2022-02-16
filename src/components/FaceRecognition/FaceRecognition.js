

import "./FaceRecognition.css"

const Facerecognition = ({imgURL}) => {
    return (
        <div className="center ma">
            <div className="absolute ma2">
            <img alt="" src={imgURL} width="500px" height="auto"/>
            </div>
        </div>
    )
}

export default Facerecognition;