import BlogPanel from './BlogPanel'
import { render, screen } from '@testing-library/react'
import { describe, expect } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('<BlogPanel />', async () => {
  test('"blogHandle" is called with the correct inputs when creating a blog')

  const handleBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogPanel handleBlog={handleBlog} />)
  const title = screen.getByPlaceholderText('title')
  const author = screen.getByLabelText('author')
  const url = screen.getByLabelText('url')
  const addBlogBtn = screen.getByText('add blog')

  await user.type(title, 'Test Title')
  await user.type(author, 'Aatu Author')
  await user.type(url, 'www.test.com')

  await user.click(addBlogBtn)
  expect(handleBlog.mock.calls[0][0]) //toBe olettaa tämän olevan sama olio, joten pakko käyttää toStrictEqual - ilmeisesti
    .toStrictEqual({
      title: 'Test Title',
      author: 'Aatu Author',
      url: 'www.test.com',
    })
})
