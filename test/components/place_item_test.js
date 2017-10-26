import { renderComponent, expect } from '../test_helper';
import PlaceItem from '../../src/components/placeItem';

describe('PlaceItem', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(PlaceItem);
    console.log('component',component)
    const props = { places:{places:['New Comment', 'Other New Comment']}};

  });
  it('has the correct class', () => {
    expect(component).to.have.class('place-container');
  });

  it('Place list has image', () => {
    expect(component.find('img')).to.exist;
  });
  it('Place list has place name', () => {
    expect(component.find('h1')).to.exist;
  });
  it('On a place hover marker Bounce', () => {
    expect(component).to.have.attr('onMouseOver');
  });

});
