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
  background: {
    color: {
      value: "#0d47a1",
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 2,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
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
