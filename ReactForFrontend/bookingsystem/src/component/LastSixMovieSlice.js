import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const LastSixMoviesSlice = createSlice({
  name: 'lastSixMovies',
  initialState,
  reducers: {
    setLastSixMovies: (state, action) => {
      return action.payload;
    },
  },
});

export const { setLastSixMovies } = LastSixMoviesSlice.actions;
export default LastSixMoviesSlice.reducer;
