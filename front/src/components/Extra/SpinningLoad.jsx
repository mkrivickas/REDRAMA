import React, {useState, useEffect} from 'react';
import wheel from './load.png';
import './SpinningLoad.css';

const SpinningLoad = ({width, height, windowHeight, windowWidth, opacity}) => {
  let [defWidth, setDefWidth] = useState("200px");
  let [defHeight, setDefHeight] = useState("200px");
  let [maxHeight, setMaxHeight] = useState("100%");
  let [maxWidth, setMaxWidth] = useState("100%");
  let [boxOpacity, setBoxOpacity] = useState(0.5);

  useEffect(() => {
    if (width){
      setDefWidth(width);
    }if(height){
      setDefHeight(height);
    }if(windowHeight){
      setMaxHeight(windowHeight);
    }if(windowWidth){
      setMaxWidth(windowWidth);
    }if(opacity){
      setBoxOpacity(opacity);
    }
  }, [width, height, windowHeight, windowWidth, opacity]);
  
  return (
    <div className='spinningWheel' style={{width: maxWidth, height: maxHeight, backgroundColor: `rgba(18, 18, 18,${boxOpacity})`}}>
        <img src={wheel} style={{width:defWidth, height:defHeight}} alt="loading"></img>
    </div>
  )
}

export default SpinningLoad