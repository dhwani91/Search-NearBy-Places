import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Actions from '../actions/actions_googlemap.js';
import PlacesList from '../components/placesList.jsx';

class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      places: [],
      allPlaces: [],
      getDetails: null,
      detailMarker: null,
      placeDetails: null,
      shouldUpdate: true
    };
    this.initMap = this.initMap.bind(this);
    this.initInfoWindow = this.initInfoWindow.bind(this);
  }
  initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: this.props.map.position
    });
    this.map = map;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
        this.props.setBrowserLocation(pos);
      });
    }
    return map;
  }



  initInfoWindow() {
    const infoWindow = new google.maps.InfoWindow();
    this.setState({window:infoWindow});
    content: <div className>
      <div className="title">{this.props.name}</div>
      <address>{this.props.address}</address>
      </div>
    return infoWindow
  }
  componentDidMount() {
    let map = this.initMap();
    const input = document.getElementById('pac-input');
    const searchBox = new google.maps.places.SearchBox(input);
    let infoWindow = this.initInfoWindow()
    const service = new google.maps.places.PlacesService(map);


    const getDetails = (request) => {
      service.getDetails(request, detailsCallback);
    };

    const detailsCallback = (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        this.state.allPlaces.forEach(place => {
          if (place.place.geometry.location.lat() !== results.geometry.location.lat() ||
            place.place.geometry.location.lng() !== results.geometry.location.lng()) {
            place.marker.setMap(null);
          }
        });
        this.setState({placeDetails: results});
      }
    };

    service.nearbySearch({
      location: this.props.map.position,
      radius: 100,
      type: ['store']
    }, serviceCallback);
    const serviceCallback = (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i]);

        }
      }
    }
    const createMarker = (place) => {
      const placeLocation = place.geometry.location;
      console.log(placeLocation);
      const marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        draggable: false,
        animation: google.maps.Animation.DROP
      });
      google.maps.event.addListener(marker, 'click',function () {
        // infoWindow.setContent(place.name);
        infoWindow.open(map, this);
      });
    }
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener('places_changed', () => {

      this.state.allPlaces.forEach(place => {
        place.marker.setMap(null);
      });

      const places = searchBox.getPlaces();
      let allPlaces = [];
      const placeDetails = [];
      if(places.length === 0) return;

      const bounds = new google.maps.LatLngBounds();
      places.forEach(place => {
        if(!place.geometry) return;

        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        const marker = new google.maps.Marker({
          map: map,
          // icon: icon,
          title: place.name,
          draggable: false,
          position: place.geometry.location,
          animation: google.maps.Animation.DROP
        });


        function toggleBounce() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
          }
        }
        marker.addListener('click',function (){
          infoWindow.setContent(place.name,place.formatted_address);
          infoWindow.open(map, this);
        });

        allPlaces.push({
          place: place,
          marker: marker
        });

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      //this.getPlaces(places,getDetails)


      this.setState({ allPlaces: allPlaces,
        places: allPlaces,
        getDetails: getDetails,
        shouldUpdate: true });

      map.fitBounds(bounds);

      const updatePlaces = () => {
        let newPlaces = [];

        let bounds = new google.maps.LatLngBounds();
        bounds = map.getBounds();

        this.state.allPlaces.forEach(place => {

          if (bounds.contains(place.marker.getPosition())) {
            newPlaces.push(place);
          }
        });
        this.setState({places: newPlaces, shouldUpdate: false});
      };
      google.maps.event.addListener(map,'bounds_changed', updatePlaces);
     const  updateMapWhenMoved =() =>{
      }

      google.maps.event.addListener(map,'dragend',updateMapWhenMoved);
    });
  }
  render() {

    return(
      <section className="map-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <PlacesList getDetails={this.state.getDetails} placeDetails={this.state.placeDetails}
                          places={this.state.places}
                         shouldUpdate={this.state.shouldUpdate}
                         map={this.map ? this.map : null}
                        infoWindow={this.state.window}/>
            </div>
            <div className="col-md-8">
              <div className="map-container">
                <div id="map"  className={this.props.map.showMap ? 'visible': 'hidden'} style={{height: "100vh"}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    map: state.map
  };
};
export default connect(mapStateToProps, Actions)(MapContainer);
