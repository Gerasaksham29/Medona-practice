import React, { Component } from 'react'

class Map extends Component {








    render() {
        return (
            <div >
                componentDidMount() {
                    navigator.geolocation.getCurrentPosition(function (position) {


                        console.log(position.coords.latitude)
                        console.log(position.coords.longitude)



                    })
                }
            </div>
        )
    }
}

export default Map