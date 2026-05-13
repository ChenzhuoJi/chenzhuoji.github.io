import { useMemo } from 'react'
import { getAllPosts, getPostBySlug, getAllTags, getPostsByTag } from '../utils/posts'

export function usePosts() {
  return useMemo(() => getAllPosts(), [])
}

export function usePost(slug: string) {
  return useMemo(() => getPostBySlug(slug), [slug])
}

export function useTags() {
  return useMemo(() => getAllTags(), [])
}

export function usePostsByTag(tag: string) {
  return useMemo(() => getPostsByTag(tag), [tag])
}
