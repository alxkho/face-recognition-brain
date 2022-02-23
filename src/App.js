import { useState } from 'react';
import './App.css';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from "react-tsparticles";

const clarifaiKey = "3cbaf747fa6440ab921a123734dc0827";
const clarifaiUserId = "7p72l82ld1iq";
const clarifaiAppId = "f94c26b8f7ca4d79913f339331b30776";
const clarifaiModelId = "celebrity-face-detection";

const particlesOptions = {
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 150,
        duration: 0.4,
      },
    },
  },
  particles: {
    links: {
      color: "#fff",
      enable: true,
      distance: 150,
      opacity: 0.5,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2
    },
    size: {
      value: 3.5,
      random: {
        enable: true,
        minimumValue: 1
      },
      animation: {
        enable: true,
        speed: 2.5,
        minimumValue: 1
      }
    },
    opacity: {
      value: 1,
      random: {
        enable: true,
        minimumValue: 0.4
      }
    },
    detectRetina: true,
  }
}

function App() {

  const [input, setInput] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [boxes, setBoxes] = useState([]);

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": clarifaiUserId,
      "app_id": clarifaiAppId
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": imgURL
          }
        }
      }
    ]
  });

  const calculateFaceLocation = (data) => {
    let boxes = [];

    data.outputs[0].data.regions.forEach(e => {
      const boundingBox = e.region_info.bounding_box;
      boxes = [...boxes, {
        id: e.id,
        result: e.data.concepts[0],
        position: {
          top: `${boundingBox.top_row * 100}%`,
          left: `${boundingBox.left_col * 100}%`,
          width: `${Math.abs((boundingBox.left_col - boundingBox.right_col) * 100)}%`,
          height: `${Math.abs((boundingBox.top_row - boundingBox.bottom_row) * 100)}%`,
        }
      }]
    })

    setBoxes(boxes)
  }

  const onInputChange = (e) => {
    setInput(e.target.value)
  }

  const onButtonSubmit = () => {
    console.log(imgURL);
    fetch(`https://api.clarifai.com/v2/models/${clarifaiModelId}/outputs`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Key ${clarifaiKey}`
      },
      body: JSON.stringify({
        "user_app_id": {
          "user_id": clarifaiUserId,
          "app_id": clarifaiAppId
        },
        "inputs": [
          {
            "data": {
              "image": {
                "url": input
              }
            }
          }
        ]
      })
    })
      .then(response => response.json())
      .then(data => {
        setImgURL(input)
        calculateFaceLocation(data)
      })
      .catch(error => console.log('error', error));
  }

  const particlesInit = (main) => {
    // console.log(main);
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
  };

  const particlesLoaded = (container) => {
    // console.log(container);
  };


  return (
    <div className="App">
      <Particles id="tsparticles" className='particles' init={particlesInit} loaded={particlesLoaded} options={particlesOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
      <FaceRecognition imgURL={imgURL} boxes={boxes} />
    </div>
  );
}

export default App;
