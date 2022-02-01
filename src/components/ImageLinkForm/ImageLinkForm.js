

import "./ImageLinkForm.css"

const key = "3cbaf747fa6440ab921a123734dc0827"

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className="">
            <p className="f3">
                {
                    'detect faces'
                }
            </p>
            <div className="center">
                <div className="pa4 br3 shadow-5 form center">
                    <input className="f4 pa2 w-70 center" type='tex' onChange={onInputChange} />
                    <button
                        className="w-30 grow f4 link ph3 pv2 dib white bg-light-blue"
                        onClick={onButtonSubmit}>
                        Detect
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;