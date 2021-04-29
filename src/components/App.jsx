import { css, StyleSheet } from "aphrodite";
import { inject, observer } from "mobx-react";
import DevTools from "mobx-react-devtools";
import React, { Component } from 'react';
import * as ReactDOM from "react-dom";
import { AppStore } from "../stores/appStore";
import { ImageStore } from "../stores/imageStore";
import ImageLoader from "./ImageLoader";
import Images from "./Images";
import Viewer from "./Viewer";

//@inject("appStore", "imageStore")
//@observer


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      device: [],
    };
    //  this.serviceactiv = new CalibrationService();
  //  this.getOneChartGro = this.getOneChartGro.bind(this);
  }

//class App extends React.Component<{ appStore?: AppStore;imageStore?: ImageStore;}> {
   render() {
   // const appStore =  AppStore;
   // const imageStore= ImageStore;
    console.log("this.props.imageStore", this.props.imageStore)
    return (
     <div className={css(styles.container)}>
         <h1>{this.props.appStore.name}</h1>
       {this.props.imageStore.selectedImage === null && (
          <ImageLoader imageStore={this.props.imageStore} />
        )}
        {this.props.imageStore.selectedImage && (
          <Viewer image={this.props.imageStore.selectedImage} />
        )} 
      </div> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    maxWidth: "800px",
    margin: "0 auto"
  }
});

export default App;
