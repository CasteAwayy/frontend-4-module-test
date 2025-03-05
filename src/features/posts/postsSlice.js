import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    status: "idle",
    errorMessage: "",
    imageStatus: "idle",
    imageError: "",
};

const fetchPostImage = createAsyncThunk("posts/fetchPostImage", async (id) => {
    const res = await fetch(`https://picsum.photos/200?random=${id}`);
    if (!res.ok || res.status !== 200) throw new Error("Image not available");
    const url = res.url;
    return { id, url };
});

const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok || res.status !== 200)
        throw new Error(
            "There might be some error while getting data from API."
        );
    const data = await res.json();
    return data;
});

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        dataInProgress(state) {
            state.status = "loading";
        },
        error(state, action) {
            state.status = "error";
            state.errorMessage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "idle";
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "error";
                state.errorMessage = action.payload;
            });
        builder
            .addCase(fetchPostImage.pending, (state) => {
                state.imageStatus = "loading";
            })
            .addCase(fetchPostImage.fulfilled, (state, action) => {
                const { id, url } = action.payload;
                state.posts[id - 1].postImage = url;
                state.imageStatus = "idle";
            })
            .addCase(fetchPostImage.rejected, (state, action) => {
                state.imageStatus = "error";
                state.imageError = action.payload;
            });
    },
});

export { fetchPosts, fetchPostImage };
export const { dataInProgress, error } = postsSlice.actions;
export default postsSlice.reducer;
