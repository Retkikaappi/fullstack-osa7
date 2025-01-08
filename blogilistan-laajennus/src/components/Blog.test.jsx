import Blog from './Blog'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  test('renders blog title, but not likes or url - 5.13', async () => {
    const blog = {
      author: 'Aatu Author',
      id: '675fda14cc2b202cc2714179',
      likes: 12,
      title: 'Testi Title',
      url: 'www.test.com',
      user: {
        id: '123abc',
        name: 'Front User',
        username: 'frontendtester',
      },
    }
    render(<Blog blog={blog} />)

    const title = screen.getByText('Testi Title', { exact: false })
    expect(title).toBeDefined()

    const likes = screen.queryByText('12')
    const url = screen.queryByText('www.test.com')
    expect(likes).toBeNull()
    expect(url).toBeNull()
  })

  test('renders likes, url and user if view is clicked - 5.14', async () => {
    const blog = {
      author: 'Aatu Author',
      id: '675fda14cc2b202cc2714179',
      likes: 12,
      title: 'Testi Title',
      url: 'www.test.com',
      user: {
        id: '123abc',
        name: 'Front User',
        username: 'frontendtester',
      },
    }
    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const btn = screen.getByText('view')
    await user.click(btn)

    const likes = screen.getByText('12', { exact: false })
    await screen.findByText('url: www.test.com')
    screen.getByText('user: frontendtester')

    expect(likes).toBeDefined()
  })

  test('clicking the "like" button calls the "handleLike" function - 5.15', async () => {
    const blog = {
      author: 'Aatu Author',
      id: '675fda14cc2b202cc2714179',
      likes: 12,
      title: 'Testi Title',
      url: 'www.test.com',
      user: {
        id: '123abc',
        name: 'Front User',
        username: 'frontendtester',
      },
    }
    const handleLike = vi.fn()
    render(<Blog blog={blog} handleLike={handleLike} />)

    const user = userEvent.setup()
    const viewBtn = screen.getByText('view')
    await user.click(viewBtn)

    const likeBtn = screen.getByText('like')
    await user.click(likeBtn)
    await user.click(likeBtn)
    expect(handleLike.mock.calls).toHaveLength(2)
  })
})
