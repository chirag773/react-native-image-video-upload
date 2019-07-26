import React, { Component } from 'react'
import { Text, View, Image, RefreshControl, ScrollView } from 'react-native'
import axios from "axios";
import { Video } from 'expo-av'

class showVideos extends Component {

    state = { 
        videos:[],
        refreshing:false
 };

    componentWillMount(){
        this.datarender()
    }

    datarender(){
        axios.get("http://192.168.0.102:3000/api/Image/getVideo")
            .then(response=>this.setState({videos:response.data}))
    }

    _onRefresh(){
        this.setState({refreshing:true})
        this.datarender()
          this.setState({refreshing: false});
      }



    render() {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this._onRefresh.bind(this)}
                  />
                }
            >
          
                        <Video 
                            source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'  }} 
                            shouldPlay
                            resizeMode="cover"
                            style={{ width:390, height: 300 }}
                        />
            
            </ScrollView>
        )
    }
}

export default showVideos
