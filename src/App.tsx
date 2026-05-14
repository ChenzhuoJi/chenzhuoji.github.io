import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import BaseLayout from './layouts/BaseLayout'
import Home from './pages/Home'
import Post from './pages/Post'
import AllPosts from './pages/AllPosts'
import TagList from './pages/TagList'
import TagPosts from './pages/TagPosts'
import About from './pages/About'
import Explore from './pages/Explore'
import GenrePosts from './pages/GenrePosts'
import ColumnPosts from './pages/ColumnPosts'

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route index element={<Home />} />
            <Route path="posts" element={<AllPosts />} />
            <Route path="posts/:slug" element={<Post />} />
            <Route path="explore" element={<Explore />} />
            <Route path="genre/:name" element={<GenrePosts />} />
            <Route path="columns/:name" element={<ColumnPosts />} />
            <Route path="tags" element={<TagList />} />
            <Route path="tags/:tag" element={<TagPosts />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}
