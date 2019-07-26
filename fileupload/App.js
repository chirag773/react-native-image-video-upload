import * as React from 'react';
import { Button, Image, View, Text } from 'react-native';
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import { createStackNavigator, createAppContainer } from "react-navigation";
import showImage from './showImage';
import showVideos from './ShowVideos';



class ImagePickerExample extends React.Component {
  state = {
    image: null,
    data:null,
    video:null
  };



  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }


_pickVideo = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
  });

  console.log(result);

  if (!result.cancelled) {
  this.setState({video:result.uri})   
  }
};

_pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
  });

  console.log(result);

  if (!result.cancelled) {
  this.setState({image:result.uri})   
  }
};

uploadVideo(){
  var data = new FormData();  
  data.append('video', {  
    uri: this.state.video,
    type:'video/mp4',
    name:'uploadVideo.mp4'
  })
fetch("http://192.168.0.102:3000/api/Image/videoupload", {  
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
   },
  method: 'POST',
  body: data
}).then(response => {
  console.log(response)
}).catch(err => {
  console.log(err)
})
}


uploadImage(){
  var data = new FormData();  
  data.append('file', {  
    uri: this.state.image,
    type:'image/jpg',
    name:'uploadImageTemp.jpg'
  })
fetch("http://192.168.0.102:3000/api/Image/imageUpload", {  
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
   },
  method: 'POST',
  body: data
}).then(response => {
  console.log(response)
}).catch(err => {
  console.log(err)
})

this.gotoImage()
}

//=================================================================================





  //=======================================================================================

  
  render() {
    let { image,video } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        }
          <View>
          <Button
          title="Upload Image"
          onPress={this.uploadImage.bind(this)}
        />
          </View>
          <Button
          title="Pick an video from camera roll"
          onPress={this._pickVideo}
        />

        {video &&
          <Image source={{ uri: video }} style={{ width: 200, height: 200 }} />
        }

          <View>
          <Button
          title="Upload Video"
          onPress={this.uploadVideo.bind(this)}
        />
          </View>

        <View>
          <Button
            title="Go to Image screen"
            onPress={this.gotoImage.bind(this)}
          />
        </View>

        <View>
          <Button
            title="Go to Video screen"
            onPress={this.gotoVideo.bind(this)}
          />
        </View>
      </View>
    );
  }


  gotoImage(){
    const { navigation } = this.props;
    navigation.navigate("Image")
  }

  gotoVideo(){
    const { navigation } = this.props;
    navigation.navigate("Video")
  }


}

const AppNavigator = createStackNavigator({
  Home: {
    screen: ImagePickerExample
  },
  Image: {
    screen: showImage
  },
  Video: {
    screen: showVideos
  }
});

export default createAppContainer(AppNavigator);