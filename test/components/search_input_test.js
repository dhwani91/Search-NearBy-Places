import { renderComponent, expect } from '../test_helper';
import SearchInput from '../../src/components/searchInput';

describe('SearchInput', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(SearchInput);

  });
  it('has the correct class', () => {
    expect((component).find('input')).to.have.class('search-input');
  });

  it('has a text area', () => {
    expect(component.find('input')).to.exist;
  });

  describe('entering some text', () => {
    beforeEach(() => {
      component.find('input').simulate('change', 'new comment');
    });

    it('shows that text in the textarea', () => {
      expect(component.find('input')).to.have.value('new comment');
    });

  });
});
