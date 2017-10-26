import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlacesIndexItem from './placeItem.jsx';
import PlaceDetails from './placeDetails.jsx';


class PlacesList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: true,
      place: null
    };
  }

  componentWillReceiveProps(props) {
    if (props.places !== this.props.places && this.state.index === false && this.props.shouldUpdate) {
      this.setState({index: true});
    } else if (props.places !== this.props.places && this.state.index) {
      props.places.forEach(place => {
        if (!place.marker.map) place.marker.setMap(this.props.map);
      });
    }
  }

  showDetails(place) {
    return () => {
      if (!this.state.index) {
        this.props.places.forEach(p => {
          p.marker.setMap(this.props.map);
        });
      }
      this.setState({index: !this.state.index, place: place});
    };
  }

  render() {
    console.log("places",this.props)
    let details;
    if(!this.state.index) {
     details = <PlaceDetails goBack={this.showDetails(this.state.place)}
    placeDetails={this.props.placeDetails}
    getDetails={this.props.getDetails}
    place={this.state.place} />
    }
    return(
      <div className ="places-container">
        {this.state.index && this.props.places.map(place => {
          return <PlacesIndexItem onClick={this.showDetails(place.place)} place={place} />;
        }) }
        {details}
      </div>
    );
  }
}
PlacesList.propTypes = {
  PlacesIndexItem: PropTypes.element,
  PlaceDetails : PropTypes.element,
  getDetails :PropTypes.function,
  place:PropTypes.object

};
export default PlacesList;
