import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { soundsGroup, soundsName } from '../helpers/ritmos';

const CajaMusical = () => {
    const KeyboardKey = ({ play, deactivateAudio, sound: { id, key, url, keyCode } }) => {
        const handleKeydown = (e) => {
          if(keyCode === e.keyCode) {
            const audio = document.getElementById(key);
            play(key, id);
            deactivateAudio(audio)
          }
        }
        
        useEffect(() => {
            document.addEventListener('keydown', handleKeydown);
        }, [])
      
        return (
          <button value="test" id={keyCode} className="drum-pad" onClick={() => play(key, id)}>
            <audio className="clip" src={url} id={key} />
            {key}
          </button>
        );
      }
      
      const Keyboard = ({ sounds, play, power, deactivateAudio }) =>  (
        <div className="keyboard">
          {power 
            ? sounds.map((sound) => <KeyboardKey sound={sound} play={play} deactivateAudio={deactivateAudio} />)
            : sounds.map((sound) => <KeyboardKey sound={{...sound, url: "#" }} play={play} deactivateAudio={deactivateAudio} />)        
          }
        </div>
      );
      
      const DumControle = ({ stop, name, power, volume, handleVolumeChange, changeSoundGroup }) => (
        <div className="controle">
          <button onClick={stop}>SWITCH {power ? 'OFF' : 'ON'}</button>
          <h2>Volumen: %{Math.round(volume * 100)}</h2>
          <input
            max="1"
            min="0"
            step='0.01'
            type="range"
            value={volume}
            onChange={handleVolumeChange}
            />
          <h2 id="display" >{name}</h2>
          <button onClick={changeSoundGroup}>Cambiar sonidos</button>
        </div>
      );
      
      const App = () => {
        const [power, setPower] = useState(true);
        const [volume, setVolume] = useState(1);
        const [soundName, setSoundName] = useState("");
        const [soundType, setSoundType] = useState("heaterKit");
        const [sounds, setSounds] = useState(soundsGroup[soundType]);
        
        const styleActiveKey = (key) => {
          key.parentElement.style.backgroundColor = "#000000"
          key.parentElement.style.color = "#ffffff"
        }        
        
       
       const deactivateAudio = (audio) => {
         setTimeout(() => {
           audio.parentElement.style.backgroundColor = "#ffffff"
           audio.parentElement.style.color = "#000000"
         }, 300)
       }
      
        const play = (key, sound) => {
          setSoundName(sound)
          const audio = document.getElementById(key);
          styleActiveKey(audio);
          audio.currentTime = 0;
          audio.play();
          deactivateAudio(audio)
        }
      
        const stop = () => {
           setPower(!power)
        }
        
        const changeSoundGroup = () => {
          setSoundName("")
          if(soundType === "heaterKit"){
              setSoundType("smoothPianoKit");
              setSounds(soundsGroup.smoothPianoKit);
          } else {
              setSoundType("heaterKit");
              setSounds(soundsGroup.heaterKit);
          }
        }
        
        const handleVolumeChange = e => {
          setVolume(e.target.value)
        }
        
        const setKeyVolume = () => {
          const audioes = sounds.map(sound => document.getElementById(sound.key));
          audioes.forEach(audio => {
            if(audio) {
              audio.volume = volume;
            }
          }) 
        }
        
        return (
          <div id="drum-machine">
            {setKeyVolume()}
            <div className="wrapper">
              <Keyboard sounds={sounds} play={play} power={power} deactivateAudio={deactivateAudio} />
              <DumControle 
                stop={stop}
                power={power}
                volume={volume} 
                name={soundName || soundsName[soundType]} 
                changeSoundGroup={changeSoundGroup}
                handleVolumeChange={handleVolumeChange} 
               />
            </div>
          </div>
        )
      };
      
      render(<App />, document.querySelector("#root"))
};

export default CajaMusical;