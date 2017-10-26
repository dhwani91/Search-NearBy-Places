import React, {Component} from 'react';
import {connect} from 'react-redux';
import Scroll from 'react-scroll'; // Imports all Mixins
import MapContainer from './mapContainer.jsx';
import * as Actions from '../actions/actions_googlemap.js';
import SearchInput from '../components/searchInput.jsx';
let Link       = Scroll.Link;
let Element    = Scroll.Element;
let Events     = Scroll.Events;
let scroll     = Scroll.animateScroll;
let scrollSpy  = Scroll.scrollSpy;

class PlacesWithMap extends Component {
  constructor(props) {
    super(props)
    this.showMap = this.showMap.bind(this)
  }
  componentDidMount(){

    Events.scrollEvent.register('begin', function(to, element) {
      console.log("begin", arguments);
    });

      Events.scrollEvent.register('end', function(to, element) {
        console.log("end", arguments);
      });

      scrollSpy.update();
  }
  componentWillUnmount(){
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }
  scrollToTop() {
  scroll.scrollToTop();
  }
  scrollToBottom() {
  scroll.scrollToBottom();
  }
  scrollTo() {
  scroll.scrollTo(100);
}
  scrollMore() {
  scroll.scrollMore(100);
}
  handleSetActive(to) {
  console.log(to);
}
  showMap(e){
      this.props.showMapContainer();
  }
  render() {
    return (
      <div className="homepage">
        <div className="homepage-hero"></div>

          <div className="search-box col-sm-12 col-md-6">
            <span className="icon-search">
                <i className="fa fa-search fa-lg"></i>
              </span>
            <SearchInput showMap={this.showMap}/>

            <Link activeClass="active" to="map" spy={true} smooth={true} offset={50} duration={500}
                  onSetActive={this.handleSetActive}>
              <button type="submit" className="btn btn-search" onClick={this.showMap}>Search</button>
            </Link>
          </div>

        <Element name="map" className="element">
          <MapContainer/>
        </Element>
        </div>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    map:state.map
  };
};
export default connect(mapStateToProps, Actions)(PlacesWithMap);

