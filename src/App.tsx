import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import BaseLayout from './layouts/BaseLayout'
import Home from './pages/Home'
import Post from './pages/Post'
import AllPosts from './pages/AllPosts'
import TagList from './pages/TagList'
import TagPosts from './pages/TagPosts'
import GenrePosts from './pages/GenrePosts'
import Gallery from './pages/Gallery'
import Reading from './pages/Reading'
import BookNote from './pages/BookNote'
import Landing from './pages/Landing'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* 落地页自成一体，不套站内的页眉页脚 */}
          <Route path="landing" element={<Landing />} />
          <Route element={<BaseLayout />}>
            <Route index element={<Home />} />
            <Route path="posts" element={<AllPosts />} />
            <Route path="posts/:slug" element={<Post />} />
            <Route path="genre/:name" element={<GenrePosts />} />
            <Route path="tags" element={<TagList />} />
            <Route path="tags/:tag" element={<TagPosts />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="reading" element={<Reading />} />
            <Route path="reading/:slug" element={<BookNote />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}
