import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Form, Button } from 'react-bootstrap';
import './searchbar.css';
import * as stores from './stores';
import './sidebar.css';

const google = window.google;
const style = {

  height: '100vh'
}
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // for google map places autocomplete
      address: '',

      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},

      mapCenter: {
        lat: null,
        lng: null
      },
      setZoom: 10,


    };
    this.getLocation = this.getLocation.bind(this);
    this.showPosition = this.showPosition.bind(this);
    this.Locate = this.Locate.bind(this);
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition, this.showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  showPosition(position) {
    // console.log(position.coords.longitude);
    this.setState({
      mapCenter: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    })
  }
  showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      setZoom: 13
    });
  Locate(lati, longi) {
    this.setState({
      mapCenter: {
        lat: lati,
        lng: longi,
      },
      setZoom: 13,
    });
    console.log('clicked');
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    };
  }
  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);

        // update center state
        this.setState({ mapCenter: latLng });
      })
      .catch(error => console.error('Error', error));
  };

  render() {
    const point = {
      lat: this.state.mapCenter.lat,
      lng: this.state.mapCenter.lng
    }
    return (
      <div id='googleMaps'>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <h4 className="heading h" > FIND STORE: </h4>
              <Form.Control
                type='text'
                name='q'

                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input mr-sm-2 ml-sm-5 frm',
                })}
              ></Form.Control>
              <Button type='submit'
                variant='outline-success'
                className='p-2' onClick={this.getLocation}>Locate Me</Button>
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>

        <Map
          google={this.props.google}

          initialCenter={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng
          }}
          center={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng
          }}
          style={style}
          zoom={this.state.setZoom}
          // bounds = { bounds}
          centerAroundCurrentLocation={true}

        >
          {stores.features.map((stor) =>
            <Marker
              key={stor.properties.storeid}
              position={{
                lat: stor.geometry.coordinates[1],
                lng: stor.geometry.coordinates[0]
              }}
              onClick={this.onMarkerClick}
              name={stor.properties.name}
              description={stor.properties.hours}
            // animation={google.maps.Animation.DROP}
            />
          )}

          < Marker
            position={{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng
            }}
            onClick={this.onMarkerClick}
            name={'Your current Location'}
            // animation={google.maps.Animation.DROP}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            onOpen={this.windowHasOpened}
            onClose={this.windowHasClosed}
            visible={this.state.showingInfoWindow}

          >
            <div>
              <h3>{this.state.selectedPlace.name}</h3>
              <p>{this.state.selectedPlace.description}</p>
              {/* <p>{this.state.selectedPlace.description}</p> */}
            </div>
          </InfoWindow>
        </Map>
        <section className="sidebar" >
          <div className="sidebar-inner">

            <ul>
              {stores.features.map((s) =>
                <li className="listitem ">Store : {s.properties.storeid}
                  <h3>{s.properties.name}</h3>
                  <p>{s.properties.phone}</p>
                  {/* {console.log(s.geometry.coordinates)} */}

                  < button className='btn btn2 btn-info' onClick={() => this.Locate(s.geometry.coordinates[1], s.geometry.coordinates[0])}> Locate

                  </button >
                </li>
              )}
            </ul>


          </div>
        </section>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('')
})(MapContainer)
