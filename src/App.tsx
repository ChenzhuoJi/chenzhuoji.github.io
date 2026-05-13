import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import BaseLayout from './layouts/BaseLayout'
import Home from './pages/Home'
import Post from './pages/Post'
import TagList from './pages/TagList'
import TagPosts from './pages/TagPosts'
import About from './pages/About'

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<BaseLayout />}>
            <Route index element={<Home />} />
            <Route path="posts/:slug" element={<Post />} />
            <Route path="tags" element={<TagList />} />
            <Route path="tags/:tag" element={<TagPosts />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}
