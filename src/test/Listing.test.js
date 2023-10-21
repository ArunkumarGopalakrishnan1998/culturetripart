import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Listing from '../components/Listing.js';

// Mocking user data
const mockStore = configureStore([]);
const initialState = {
  users: [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' }
  ],
};
const store = mockStore(initialState);

describe('Listing Component', () => {
  it('renders a list of grid from the Redux store', () => {
    // Rendering listing component with mock data
    render(
      <Provider store={store}>
        <Listing editAll={false} saveAll={false} />
      </Provider>
    );
    // Getting listing element using 'listing' testId
    const listingElements = screen.getAllByTestId('listing');
    // Getting grid element using 'grid' testId
    const gridElements = screen.getAllByTestId('grid');
    // Listing component should render only once
    expect(listingElements).toHaveLength(1); 
    // Grid component should render twice (Mock data length)
    expect(gridElements).toHaveLength(2); 
  }); 
});
