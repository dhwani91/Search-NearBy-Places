import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlaceItem extends Component {
  constructor(props) {
    super(props);
    this.startBounce = this.startBounce.bind(this);
    this.stopBounce = this.stopBounce.bind(this);
  }

  startBounce() {
    this.props.place.marker.setAnimation(google.maps.Animation.BOUNCE);
  }

  stopBounce() {
    this.props.place.marker.setAnimation(null);
  }

  render() {
    const place = this.props.place.place;
    const img = place.photos ? place.photos[0].getUrl({ maxWidth: 200, maxHeight: 200 }) : 'dist/img/no_img.jpg';
    return(
      <div onMouseOver={this.startBounce} onMouseOut={this.stopBounce}
        onClick={this.props.onClick} className='place-container'>
        <img className='place-item-image' src={img} />
        <div className='place-index-details-container'>
          <h1 className='place-name'>{place.name}</h1>
          <h2 className='place-details'>{place.formatted_address}</h2>
        </div>
      </div>
    );
  }
}
PlaceItem.propTypes = {
  PlacesIndexItem: PropTypes.element,
  PlaceDetails : PropTypes.element,
  getDetails :PropTypes.function,
  place:PropTypes.object

};

export default PlaceItem;
