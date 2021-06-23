import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({box, imageUrl}) => {
	const faceBoxes = box.map(item=> <div className="bounding-box" style={{top: item.topRow,bottom:item.bottomRow,left:item.leftCol,right:item.rightCol}} key={item.rightCol
	}></div>);
	// console.log("fb",faceBoxes);
	// console.log(box);
	return(
		<div className="center ma2">
			<div className="relative">
				<img id="inputImage" src={imageUrl} width="500px" height="auto"/>
				{faceBoxes}
				{/*<div className="bounding-box" style={{top: box.topRow,bottom:box.bottomRow,left:box.leftCol,right:box.rightCol}}></div>*/}
			</div>
		</div>
	);
}

export default FaceRecognition;