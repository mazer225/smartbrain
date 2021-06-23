import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
	return(
		<div className="ma4 mt0">
			<Tilt className="Tilt shadow-2" options={{ max : 40 }} style={{ height: 150, width: 150 }} >
			 <div className="Tilt-inner"> 
			 	<img src={brain} alt="logo" width="100px" height="100px"/>
			 </div>
			</Tilt>
		</div>
	);
}

export default Logo;