

import "./ImageLinkForm.css"

const ImageLinkForm = () => {
    return (
        <div className="">
            <p className="f3">
                {
                    'detect faces'
                }
            </p>
            <div className="center">
                <div className="pa4 br3 shadow-5 form center">
                    <input className="f4 pa2 w-70 center" type='tex' />
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-blue">Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;