import React from 'react';

const Navigation = ({route,onRouteChange}) => {
	if(route==="home") {
		return (
			<nav  style={{display: 'flex',justifyContent: 'flex-end',textDecoration: 'underline',textDecorationColor: 'white',color:'white'}}>
				<p onClick={()=>onRouteChange("signout")} className="dim f3 pa3 pointer mt3 mr3">Sign Out!</p>
			</nav>
		);
	}
	else if(route==="signin") {
		return(
			<nav style={{display: 'flex',justifyContent: 'flex-end',textDecoration: 'underline',textDecorationColor: 'white',color:'white'}}>
				<p onClick={()=>onRouteChange("signin")} className="dim f3 pa3 pointer mt3 mr3">Sign In</p>
				<p onClick={()=>onRouteChange("register")} className="dim f3 pa3 pointer mt3 mr3">Register</p>
			</nav>
		);
	}
	else if(route==="register") {
		return(
			<nav className="stylenav" style={{display: 'flex',justifyContent: 'flex-end',textDecoration: 'underline',textDecorationColor: 'white',color:'white'}}>
				<p onClick={()=>onRouteChange("signin")} className="dim f3 pa3 pointer mt3 mr3">Sign In</p>
				<p onClick={()=>onRouteChange("register")} className="dim f3 pa3 pointer mt3 mr3">Register</p>
			</nav>
		);	
	}
}

export default Navigation;