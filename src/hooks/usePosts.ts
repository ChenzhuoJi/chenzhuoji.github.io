import { useMemo } from 'react'
import {
  getAllPosts, getPostBySlug, getAllTags, getPostsByTag,
  getPostsByGenre, getAllColumns, getPostsByColumn, getColumnNav,
  getPinnedPosts, getRecentPosts, getRelatedPosts, getGraphData,
} from '../utils/posts'
import type { Genre } from '../types'

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

export function usePostsByGenre(genre: Genre) {
  return useMemo(() => getPostsByGenre(genre), [genre])
}

export function useColumns() {
  return useMemo(() => getAllColumns(), [])
}

export function usePostsByColumn(column: string) {
  return useMemo(() => getPostsByColumn(column), [column])
}

export function useColumnNav(slug: string) {
  return useMemo(() => getColumnNav(slug), [slug])
}

export function usePinnedPosts() {
  return useMemo(() => getPinnedPosts(), [])
}

export function useRecentPosts(count: number = 10) {
  return useMemo(() => getRecentPosts(count), [count])
}

export function useRelatedPosts(slug: string, limit = 3) {
  return useMemo(() => getRelatedPosts(slug, limit), [slug, limit])
}

export function useGraphData() {
  return useMemo(() => getGraphData(), [])
}
