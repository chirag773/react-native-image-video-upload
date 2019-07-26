import React, { Component } from 'react'
import { Text, View, Image, RefreshControl, ScrollView } from 'react-native'
import axios from "axios";

class showImage extends Component {

    state = { 
        images:[],
        refreshing:false
 };

    componentWillMount(){
        this.datarender()
    }

    datarender(){
        axios.get("http://192.168.0.102:3000/api/Image/getImage")
            .then(response=>this.setState({images:response.data}))
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
                {
                    this.state.images.map((image,key) => 
                        <Image 
                            key={image._id}
                            source={{ uri: image.Image }} 
                            style={{ width: 400, height: 200 }} 
                        />
                    )
               }
            </ScrollView>
        )
    }
}

export default showImage
