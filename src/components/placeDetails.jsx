import React, { Component } from 'react';
import Slider from 'react-image-slider';

class PlaceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeDetails: null,
      currentPhoto: 0,
      details: false
    };
    this.renderSearch = this.renderSearch.bind(this);
    this.navigate = this.navigate.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({details: true, placeDetails: props.placeDetails});
  }

  componentDidMount() {
    const request =  { placeId: this.props.place.place_id };
    this.props.getDetails(request);
  }

  reviewStars(numStars) {
    let stars = [];
    for(let i = 0; i < 5; i++) {
      if (i < numStars) {
        stars.push(<i className="fa fa-star " key={i}></i>);
      } else {
        stars.push(<i className="fa fa-star-o " key={i}></i>);
      }
    }
    return <div className='stars'>{stars}</div>;
  }


  renderSearch() {
    this.setState({details: !this.state.details, reviews: false});
  }

  navigate(loc) {

    const reviews = this.state.details && loc === 'reviews' ? true : false;

    this.setState({
      details: !this.state.details,
      reviews: reviews
    });
  }
  getDetails() {
    const place = this.props.placeDetails;
    let open;
    if (place.opening_hours) {
      open = (
          <li>
          <i className="fa-clock-o fa fa-lg"></i>
          <div>{place.opening_hours.open_now ? "Open" : "Closed"} Now</div>
          <i className="fa fa-angle-down fa-lg" data-toggle="collapse" href="#opentime"
             aria-expanded="false" aria-controls="opentime">
      </i>
          <div className="collapse" id="opentime">
            <ul className="card card-body">
            {place.opening_hours.weekday_text.map(day => {
              return <li  className="open-time" style={{fontSize: '13px', color: 'grey', padding: '2px'}} key={day}>{day}</li>;
            })}
            </ul>
          </div>
            </li>
      );
    }
    const photos = place.photos ? place.photos.map(photo => {
      return(photo.getUrl({ maxWidth: 360, maxHeight: 200 }));
    }) : ['dist/img/no_img.jpg'];

    console.log(place);

    let rating = 0;

    if (!place.rating && place.reviews) {
      let sum = 0;
      place.reviews.forEach(review => {
        sum += review.rating;
      });
      rating = parseInt(sum / place.reviews.length);
    } else if (place.rating) {
      rating = parseInt(place.rating);
    }


    return(<div>
      <div className="reviews">
        {this.reviewStars(rating)}
        {place.reviews ? <div className='detail-buttons'>{place.reviews.length} Reviews</div> :
          <div className='detail-buttons'>No Reviews</div>}
      </div>
      <div className="place-details-info">
        <ul>
          {open}
          {place.formatted_address &&
          <li>
            <i className="fa-map-marker fa fa-lg"></i>
            <div>{place.formatted_address}</div>
          </li>
          }
          {place.website &&
          <li>
            <i className="fa fa-globe fa-lg"></i>
            <div><a href={place.website} target="_blank">{place.website}</a></div>
          </li>
          }
          {place.formatted_phone_number &&
          <li>
            <i className="fa fa-phone fa-lg"></i>
            <div>{place.formatted_phone_number}</div>
          </li>
          }
        </ul>
        <div className="photo-slider">
          <Slider images={photos} isInfinite delay={5000}>
            {photos.map(photo => {
              return(<img className="slide-image" key={photo} src={photo} />);
            })}
          </Slider>
        </div>
      </div>
    </div>);
  }

  render() {
    return(
      <div>
        <div className="place-details-header">
          <i className="fa  fa-chevron-left fa-lg back-arrow"
             onClick={this.state.details ? this.props.goBack : this.navigate} ></i>
          <div className="place-detail-title">{this.props.place.name}</div>
        </div>
        <div className="place-details-container">
          {this.state.details ? this.getDetails() : null}
        </div>
      </div>
    );
  }
}

export default PlaceDetails;
