import { useMemo } from 'react'
import {
  getAllPosts,
  getPostBySlug,
  getPostsByTag,
  getPostsByGenre,
  getPostsByColumn,
} from '../utils/posts'
import type { Genre } from '../types'

export function usePosts() {
  return useMemo(() => getAllPosts(), [])
}

export function usePost(slug: string) {
  return useMemo(() => getPostBySlug(slug), [slug])
}

export function usePostsByTag(tag: string) {
  return useMemo(() => getPostsByTag(tag), [tag])
}

export function usePostsByGenre(genre: Genre) {
  return useMemo(() => getPostsByGenre(genre), [genre])
}

export function usePostsByColumn(column: string) {
  return useMemo(() => getPostsByColumn(column), [column])
}
