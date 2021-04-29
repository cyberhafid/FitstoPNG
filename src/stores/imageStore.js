import { action, flow, observable } from "mobx";
import loadImage from "../lib/loadImage";
import Image from "./image";

export class ImageStore {

   addImage = flow(function*(file) {
    const result = yield loadImage(file);
    const newImage = new Image(
      this.imageIdCounter,
      result.imageData,
      result.metaData,
      result.header
    );
    this.images.push(newImage);
    this.selectedImage = newImage;
    this.imageIdCounter++;
    console.log('devicellllll', newImage)
  });

}

export default new ImageStore();
