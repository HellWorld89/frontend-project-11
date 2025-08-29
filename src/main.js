import {
  initState, addFeed, openModal, closeModal, markPostAsRead,
} from './state'
import View from './view'
import { createValidator, validateUrl } from './validator'
import i18next from './i18n'
import { fetchRSS, processFeed, startUpdateCycle } from './rss'

const elements = {
  form: document.querySelector('.rss-form'),
  input: document.getElementById('url-input'),
  feedback: document.querySelector('.feedback'),
  submitButton: document.querySelector('button[type="submit"]'),
}

if (!elements.form || !elements.input || !elements.feedback) {
  throw new Error('Required elements not found in DOM')
}

const view = new View(elements)
const state = initState(() => {
  if (view.render) {
    view.render()
  }
})

let isAppInitialized = false

function initializeApp() {
  return new Promise(resolve => {
    if (i18next.isInitialized) {
      resolve()
      return
    }

    i18next.on('initialized', () => {
      console.log('i18n initialized successfully')
      resolve()
    })
  })
}

initializeApp().then(() => {
  view.init(state)
  View.updateStaticTexts()
  isAppInitialized = true

  view.state.markPostAsRead = postId => {
    markPostAsRead(state, postId)
    if (view.render) {
      view.render()
    }
  }

  view.state.onPreviewButtonClick = postId => {
    const post = state.posts.find(p => p.id === postId)
    if (post) {
      openModal(state, postId)
      view.openModal(post)

      if (view.state.markPostAsRead) {
        view.state.markPostAsRead(postId)
      }
    }
  }
  view.state.onModalClose = () => {
    closeModal(state)
  }

  console.log('Application initialized successfully')
}).catch(error => {
  console.error('Failed to initialize application:', error)
})

elements.form.addEventListener('submit', async e => {
  e.preventDefault()

  if (!isAppInitialized) {
    console.error('Application is not initialized yet')
    return
  }

  if (elements.submitButton) {
    elements.submitButton.disabled = true
  }

  try {
    const formData = new FormData(e.target)
    const rawUrl = formData.get('url')
    const url = rawUrl ? rawUrl.trim() : ''

    state.form.status = 'validating'
    state.form.url = url

    const existingUrls = state.feeds.map(feed => feed.url)
    const validator = createValidator(existingUrls)

    const validUrl = await validateUrl(url, validator)
    const data = await fetchRSS(validUrl)
    const { feed, posts } = processFeed(url, data)

    const feedId = Date.now()
    const feedWithId = { ...feed, id: feedId, url }
    const postsWithId = posts.map((post, index) => ({
      ...post,
      id: `${feedId}-${index}`,
      feedId,
    }))
    addFeed(state, feedWithId, postsWithId)
    state.form.status = 'submitted'
    state.form.error = null

    startUpdateCycle(state)
  } catch (error) {
    state.form.status = 'invalid'
    const errorKey = error instanceof Error ? error.message : error
    state.form.error = errorKey
    console.error('Error adding feed:', error)
  } finally {
    if (view.render) {
      view.render()
    }

    if (elements.submitButton) {
      elements.submitButton.disabled = false
    }
  }
})
