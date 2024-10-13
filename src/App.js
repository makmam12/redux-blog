import './App.css';
import './register.css'
import Counter from './features/counter/Counter';
import PostsList from './features/posts/PostsList';
import AddPostForm from './features/posts/AddPostForm'
import SinglePostPage from './features/posts/SinglePostPage'
import Header from './components/Header';
import { useSelector } from 'react-redux';
import EditPost from './features/posts/EditPost';
import { Route, Routes } from 'react-router-dom';

function App() {
  const post = useSelector((state) => state.posts.singlePost)

  return (
    <div className="App">
      <Header />
      <main>
    <Routes>

        <Route path='/' element={<PostsList/>} />
        <Route path='/New' element={<AddPostForm/>} />
        <Route path='/edit' element={<EditPost/>} />      
      <Route path='/post/:id' element={<SinglePostPage />}/>

    </Routes>
      </main>
    </div>
  );
}    

export default App;
