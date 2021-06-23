import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
// import Clarifai from 'clarifai';


const particlesOption = {
                particles: {
                  number:{
                    value:80,
                  density: {
                    enable: true,
                    value_area: 800
                  }
              }
            }
          }

const initialState = {
      input:"",
      imageUrl:"",
      box:[],
      route:"signin",
      user:{
        id:"",
        name:"",
        email:"",
        password:"",
        entries:0,
        joined:""
      }
    };
class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined:data.joined
    }})
  }

  calculateFaceLocation = (resp) => {
    // const clarifaiFace = 
    // console.log("inside calc");
    const image = document.getElementById('inputImage');
    const width = image.width;
    const height = image.height;
    const cF = resp.outputs[0].data.regions.map(item=> {
      // console.log("inside loop",item.region_info.bounding_box);
      let objTemp = {
        leftCol: item.region_info.bounding_box.left_col * width,
        topRow : item.region_info.bounding_box.top_row * height,
        rightCol: width - (item.region_info.bounding_box.right_col * width),
        bottomRow: height - (item.region_info.bounding_box.bottom_row * height)
      };
      return objTemp;
    })
    // console.log("cF",cF[0]);
    return cF;
    // console.log(resp.outputs[0].data.regions);
    // const clarifaiFace = resp.outputs[0].data.regions[0].region_info.bounding_box;
    // return {
    //   leftCol: clarifaiFace.left_col * width,
    //   topRow : clarifaiFace.top_row * height,
    //   rightCol: width - (clarifaiFace.right_col * width),
    //   bottomRow: height - (clarifaiFace.bottom_row * height)
    // };
  }

  // setBoxValue = (boxValue) => {
  //   console.log("inside set box value");
  //   console.log(boxValue);
  //   this.setState({box:boxValue});
  // }

  onInputChange = (event) => {
    this.setState({input : event.target.value});
  }

  onButtonClick = () => {
    this.setState({imageUrl: this.state.input});
    fetch("https://fast-scrubland-22806.herokuapp.com/imageurl",{
      method:"post",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
      input:this.state.input
      })
    })
    .then(response=>response.json())
    .then(response => {
      if(response) {
        fetch("https://fast-scrubland-22806.herokuapp.com/image",{
          method:"put",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            id:this.state.user.id
          })
        }).then(response=>response.json())
        .then(counts=>{
          // console.log(counts);
          this.setState(Object.assign(this.state.user,{entries:counts}));
        })
        .catch(console.log)
      }
      this.setState({box:this.calculateFaceLocation(response)})
    })
    .catch(err=>console.log(err));
    // .then(response =>  this.setBoxValue(this.calculateFaceLocation(response)))
    
  }

  onRouteChange = (redirectingPage) => {
    if(redirectingPage==='signout') {
      this.setState(initialState);
      this.setState({route:'signin'});  
    }
    else {
      this.setState({route:redirectingPage});
    }
  }

  render() {
    // console.log(this.state.user);
    // console.log(this.state.route);
    return (
      <div className="App">
        <Particles className="particlesCss" params={particlesOption}/>
        <Navigation className="NavCss" route={this.state.route} onRouteChange={this.onRouteChange}/>
        {this.state.route==="home"
        ?<div>
          <Logo />
          <Rank userName={this.state.user.name} userEntries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick}/>
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
        </div>
        :(this.state.route==="signin"
          ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)
        }
      </div>
  );  
  }
  
}

export default App;
