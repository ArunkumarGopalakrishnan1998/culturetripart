import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Grid from '../components/Grid.js';
import { Provider } from 'react-redux'; // If using Redux
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const initialState = {
  users: [
    { id: 1, name: 'User 1' }
  ],
};
const store = mockStore(initialState);

describe('Grid Component', () => {
  it('renders the Grid component with user details', () => {
    const user = initialState.users[0];
    render(
      <Provider store={store}>
        <Grid user={user} editEnabled={false} doSaveAll={false} />
      </Provider>
    );
    const gridElement = screen.getByTestId('grid');
    const avatarImage = screen.getByAltText('avatar_logo');
    const userName = screen.getByText(user.name);
    // Elements check
    expect(gridElement).toBeInTheDocument();
    expect(avatarImage).toBeInTheDocument();
    expect(userName).toBeInTheDocument();
  });

  it('allows editing user name when "Edit" button is clicked', () => {
    const user = initialState.users[0];
    render(
      <Provider store={store}>
        <Grid user={user} editEnabled={false} doSaveAll={false} />
      </Provider>
    );
    const editButton = screen.getByText('Edit');
    // Clicking the edit button
    fireEvent.click(editButton);
    // Getting the edit input tag
    const editInput = screen.getByTestId(`${user.id}userEdit`);
    // Check in DOM
    expect(editInput).toBeInTheDocument();
  });

  it('cancels user name editing when "Cancel" button is clicked', () => {
    const user = initialState.users[0];
    render(
      <Provider store={store}>
        <Grid user={user} editEnabled={false} doSaveAll={false} />
      </Provider>
    );
    // Clicking the edit button
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    // Clicking the cancel button once it is rendered
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);
    // Getting the edit input tag
    const editInput = screen.queryByTestId(`${user.id}userEdit`);
    // Should not be in the DOM
    expect(editInput).toBeNull();
  });

});
