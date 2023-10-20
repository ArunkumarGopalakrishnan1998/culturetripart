import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        addUser: (state, action) => {
            let updatedUsers = state;
                updatedUsers.unshift(action.payload)
            return updatedUsers
        },

        deleteUser: (state, action) => {
            let updatedUsers = state.filter((element) => element.id !== action.payload)
            return updatedUsers
        },

        editUser: (state, action) => {
            state.map((element) => {
                if (element.id === action.payload.id) {
                    element.name = action.payload.name;
                }
            })
        },

        deleteAllUsers: (state) => {
            return [];
        }
    }
})

export const { addUser, deleteUser, editUser, deleteAllUsers } = usersSlice.actions;

export default usersSlice.reducer