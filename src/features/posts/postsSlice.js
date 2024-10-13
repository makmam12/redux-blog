import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const POSTS_URL = "http://localhost:3500/posts";

const postsAdapter = createEntityAdapter({});

const initialState = postsAdapter.getInitialState({
  singlePost: 0,
  status: "idle",
  error: null,
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  console.log(response.data);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost);
    if (response.data) {
      console.log(response.data);
      return response.data;
    } else {
      return response.status.massage;
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (initialPost) => {
    const response = await axios.put(
      `${POSTS_URL}/${initialPost.id}`,
      initialPost
    );
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (initialPost) => {
    const response = await axios.delete(`${POSTS_URL}/${initialPost.id}`);
    if (response.status === 200) return initialPost;
    return response.data;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },

    rectionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const targetedPost = state.entities[postId];
      if (targetedPost) {
        targetedPost.reactions[reaction]++;
      }
    },

    showSinglePost(state, action) {
      state.singlePost = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        const loadedPosts = action.payload.map((post) => {
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };

          return post;
        });

        postsAdapter.upsertMany(state, loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        };
        console.log(action.payload);
        postsAdapter.addOne(state, action.payload);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("could not be updated");
          console.log(action.payload);
          return;
        }
        postsAdapter.upsertOne(state, action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not be completed");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        postsAdapter.removeOne(state, id);
      });
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostsIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const getPostsStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.error;

export const { addPost, rectionAdded, showSinglePost } = postSlice.actions;

export default postSlice.reducer;
