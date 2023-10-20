import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';
import {addUser} from './features/users/usersSlice'
import store from './store';

describe('App Component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  // Testing the header
  it('should render the header with "Welcome"', () => {
    const header = screen.getByText('Welcome');
    expect(header).toBeInTheDocument();
  });

  // Testing the footer
  it('should render the footer with "Thank you"', () => {
    const footer = screen.getByText('Thank you');
    expect(footer).toBeInTheDocument();
  });

  // Testing the data fetching and displaying part
  it('should call fetchUsers and dispatch addUser when component mounts', async () => {
    // Fetch users
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: 1, name: 'User Arun' }]),
      })
    );
    // Dispatching addUser
    store.dispatch(addUser({ id: 1, name: 'User Arun' }));
    // Component mount
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Component mount check
    await screen.queryAllByText('User Arun');
    // Fetch users check
    expect(global.fetch).toHaveBeenCalledTimes(1);
    // Dispatch check
    expect(store.getState().users).toEqual([addUser({ id: 1, name: 'User Arun' }).payload]);
  });
})