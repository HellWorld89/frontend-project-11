import axios from 'axios'
import parseRSS from './parser'
import { addPosts } from './state'

let updateTimeoutId = null

// Вспомогательные функции
export function stopUpdateCycle() {
  if (updateTimeoutId) {
    clearTimeout(updateTimeoutId)
    updateTimeoutId = null
  }
}

export function fetchRSS(url) {
  const proxyUrl = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`
  return axios.get(proxyUrl)
    .then((response) => {
      if (!response.data || typeof response.data !== 'object') {
        throw new Error('errors.network')
      }
      let httpCode = response.status
      if (response.data.status && response.data.status.http_code) {
        httpCode = response.data.status.http_code
      }
      else if (response.data.contents
        && response.data.contents.status
        && response.data.contents.status.http_code) {
        httpCode = response.data.contents.status.http_code
      }

      if (httpCode !== 200) {
        throw new Error('errors.network')
      }

      return response.data.contents || response.data
    })
    .catch((error) => {
      if (error.isAxiosError) {
        throw new Error('errors.network')
      }
      throw error
    })
}

export function processFeed(url, data) {
  try {
    const content = typeof data === 'string' ? data : data.contents
    return parseRSS(content)
  }
  catch (error) {
    throw new Error('errors.parsing')
  }
}

// Основные функции обновления
export function updateFeeds(state) {
  console.log('🔁 Начало проверки обновлений', new Date().toLocaleTimeString())

  const promises = state.feeds.map((feed) => {
    console.log(`📡 Проверяем фид: ${feed.title}`)
    return fetchRSS(feed.url)
      .then((data) => processFeed(feed.url, data))
      .then(({ posts }) => {
        const feedPosts = state.posts.filter((post) => post.feedId === feed.id)
        const latestExistingPost = feedPosts.length > 0
          ? feedPosts.sort((a, b) => new Date(b.pubDate || 0) - new Date(a.pubDate || 0))[0]
          : null

        // Фильтруем новые посты - только те, которые новее самого свежего из имеющихся
        const newPosts = posts.filter((post) => {
          // Если нет даты публикации или нет существующих постов, считаем все посты новыми
          if (!post.pubDate || !latestExistingPost || !latestExistingPost.pubDate) return true

          return new Date(post.pubDate) > new Date(latestExistingPost.pubDate)
        })

        console.log(`📊 Найдено новых постов: ${newPosts.length}`)

        if (newPosts.length > 0) {
          const postsWithId = newPosts.map((post, index) => ({
            ...post,
            id: `${feed.id}-${Date.now()}-${index}`,
            feedId: feed.id,
          }))
          addPosts(state, postsWithId)
          console.log('✅ Добавлены новые посты в начало списка')
        }
      })
      .catch((error) => {
        console.error('❌ Ошибка при обновлении фида:', error)
      })
  })

  return Promise.allSettled(promises)
}

export function scheduleUpdate(state) {
  stopUpdateCycle()

  if (state.feeds.length === 0) {
    return
  }

  updateTimeoutId = setTimeout(() => {
    updateFeeds(state).finally(() => {
      scheduleUpdate(state)
    })
  }, 5000)
}

export function startUpdateCycle(state) {
  if (updateTimeoutId !== null) {
    return
  }

  updateFeeds(state).finally(() => {
    scheduleUpdate(state)
  })
}
