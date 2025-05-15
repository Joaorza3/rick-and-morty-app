import { LOCAL_STORAGE_PAGE_KEY } from '@/constants'

export const savePageToStorage = (page: number) =>
  localStorage.setItem(LOCAL_STORAGE_PAGE_KEY, String(page))

export function getPageFromStorage(): number | null {
  const savedPage = localStorage?.getItem(LOCAL_STORAGE_PAGE_KEY)

  if (savedPage && !isNaN(Number(savedPage))) {
    return Number(savedPage)
  }

  return null
}

export function clearPageFromStorage() {
  localStorage.removeItem(LOCAL_STORAGE_PAGE_KEY)
}
