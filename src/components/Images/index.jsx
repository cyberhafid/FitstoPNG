import { inject, observer } from "mobx-react";
import * as React from "react";
import { ImageStore } from "../../stores/imageStore";


const Images = (props) => (
  <div>
    <h2>Images</h2>
    <ul>
      {props.imageStore.images.map(image => (
        <li key={`image-list-${image.id}`}>{image.id}</li>
      ))}
    </ul>
  </div>
);

export default (Images);
