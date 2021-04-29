//import { action, observable } from "mobx";
import GPUKernel from "../lib/gpuKernel";
import scaleFunctions from "../lib/scaleFunctions";

/* export interface IStats {
  min: number;
  max: number;
  sum: number;
  sum2: number;
  range: number;
  stdDev: number;
  histo: number[];
  histomax: number;
} */

/* export interface IMetaData {
  bitpix: number;
  blob: Blob;
  bscale: number;
  bytes: number;
  bzero: number;
  depth: number;
  frame: number;
  frameLength: number;
  frameOffsets: any[];
  height: number;
  length: number;
  nBuffers: number;
  naxis: number[];
  width: number;
  getFrame: (
    frame: number,
    callback: (imageData: Float32Array) => void
  ) => void;
} */
/* 
export interface IHeader {
  block: string;
  cardIndex: number;
  cards: {
    [key: string]: {
      comment: string;
      index: number;
      value: any;
    };
  };
  extensions: boolean;
  primary: boolean;
  verifyCard: any;
} */
/* 
class Image {
  public id: number;
  public imageData: number[];
  public metaData: IMetaData;
  public header: IHeader;
  public stats: IStats = {
    min: 0,
    max: 0,
    sum: 0,
    sum2: 0,
    range: 0,
    stdDev: 0,
    histo: new Array(600).fill(0),
    histomax: 0
  }; */


  class Image  {
  constructor(id, imageData, metaData, header) {
    this.id = id;
    this.imageData = imageData;
    this.metaData = metaData;
    this.header = header;

    this.calulateStats();
  }

 initRenderer(canvas) {
    canvas.getContext("webgl2", { preserveDrawingBuffer: true });
    this.renderer = GPUKernel(
      this.metaData.width,
      this.metaData.height,
      canvas
    );
    this.render();
  }

   render() {
    this.renderer(
      this.imageData,
      this.metaData.width,
      this.min,
      this.max,
      this.scaleMode
    );
  }

 
   updateScaleMode(scaleMode){
    this.scaleMode = scaleFunctions.indexOf(scaleMode);
    this.render();
  }

   calulateStats() {
    for (const intensity of this.imageData) {
      if (intensity > this.stats.max) {
        this.stats.max = intensity;
      }
      if (intensity < this.stats.min) {
        this.stats.min = intensity;
      }
      this.stats.sum += intensity;
      this.stats.sum2 += intensity * intensity;
    }

    this.stats.range = Math.max(1, this.stats.max - this.stats.min);
    this.stats.stdDev =
      Math.sqrt(
        this.imageData.length * this.stats.sum2 -
          this.stats.sum * this.stats.sum
      ) / this.imageData.length;

    for (const intensity of this.imageData) {
      const bin = Math.floor(
        (this.stats.histo.length - 1) *
          (intensity - this.stats.min) /
          this.stats.range
      );
      if (++this.stats.histo[bin] > this.stats.histomax) {
        this.stats.histomax = this.stats.histo[bin];
      }
    }
  }
}

export default Image;
