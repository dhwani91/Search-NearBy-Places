import React from 'react';

const SearchInput = (props)=>{
return(
  <div>
    <input className="search-input" type="search" id="pac-input" placeholder="Search Places"
           onKeyDown={props.showMap}/>
  </div>
)
}
export default SearchInput;