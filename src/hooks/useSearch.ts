import { useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import { buildSearchIndex } from '../utils/posts'

const index = buildSearchIndex()

const fuse = new Fuse(index, {
  keys: [
    { name: 'title', weight: 3 },
    { name: 'tags', weight: 2 },
    { name: 'description', weight: 1 },
    { name: 'content', weight: 1 },
  ],
  threshold: 0.4,
  includeScore: true,
})

export function useSearch() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []
    return fuse.search(query).map((r) => ({
      ...r.item,
      score: r.score,
    }))
  }, [query])

  return { query, setQuery, results }
}
