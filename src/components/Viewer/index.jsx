import { inject, observer } from "mobx-react";
import React, { Component } from 'react';
import ReactCursorPosition from "react-cursor-position";
import GPUKernel from "../../lib/gpuKernel";
import scaleFunctions from "../../lib/scaleFunctions";
import Image from "../../stores/image";
import Histogram from "./histogram";
import Zoom from "./zoom";

/* interface IProps {
  image?: Image;
}

interface IState {
  x: number;
  y: number;
  canvas: HTMLCanvasElement | null;
} */

/* interface IPosition {
  x: number;
  y: number;
} */

//@observer
class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      canvas: null
    
    };

  }
//class Viewer extends React.Component<IProps, IState> {
  //canvas = null;

/*   constructor(props: IProps) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      canvas: null
    };
  } */

   componentDidMount() {
    if (this.canvas) {
     // this.props.image!.initRenderer(this.canvas);
      this.setState({ canvas: this.canvas });
    }
  }

   updatePosition(position) {
    this.setState({ ...position });
  }

   render() {
    console.log("this.state.canvas", this.props.image)
    console.log("this.state.canvas", this.canvas)
    return (
      <div>
 
          <canvas
            style={{ width: 800, height: 800, background: "#000" }}
            ref={el => {
              this.canvas = el;
            }}
          />
      
      </div>
    );
  }
}

export default Viewer;
