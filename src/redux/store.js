import { configureStore } from "@reduxjs/toolkit";
import houseSlice from "./slice"

const store = configureStore({
    reducer: {
        houseSelector: houseSlice, // La key va al selector donde utilice el estado con useSelector no el value
    },
})

export default store