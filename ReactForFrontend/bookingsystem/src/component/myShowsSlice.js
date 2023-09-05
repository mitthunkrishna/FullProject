import { createSlice } from '@reduxjs/toolkit';

const myShowsSlice = createSlice({
    name: 'myShows',
    initialState: {
        data: [],
        apiCalled: false,
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        setApiCalled: (state, action) => {
            state.apiCalled = action.payload;
        },
    },
});

export const { setData, setApiCalled } = myShowsSlice.actions;
export default myShowsSlice.reducer;
