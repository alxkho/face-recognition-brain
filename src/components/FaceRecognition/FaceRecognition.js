

import "./FaceRecognition.css"

const Facerecognition = ({ imgURL, boxes }) => {
    return (
        <div className="center ma">
            <div className="absolute ma2">
                <img alt="" src={imgURL} width="500px" height="auto" />
                {boxes.map(box => <div className="box" style={box.position} key={box.id} />)}
            </div>
        </div>
    )
}

export default Facerecognition;