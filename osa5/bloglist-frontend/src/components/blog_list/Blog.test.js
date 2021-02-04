import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import Blog from './Blog'

test('render correct values', () => {
  const data = {
    'title': 'Doing the things I love',
    'author': 'Margareth Lovelylaa',
    'url': 'www.lovewhatyoudo.com',
    'likes': 0,
    'user': {
      'username': 'naziboy95',
      'name': 'Frederik Whiteman',
      'password': 'hitler'
    }
  }

  const component = render(
    <Blog blog = {data}/>
  )

  expect(component.container).toHaveTextContent('Doing the things I love')
  expect(component.container).toHaveTextContent('Margareth Lovelylaa')
  expect(component.container).not.toHaveTextContent('www.lovewhatyoudo.com')
  expect(component.container).not.toHaveTextContent('0')
})

test('render correct values after button click', () => {
  const data = {
    'title': 'Doing the things I love',
    'author': 'Margareth Lovelylaa',
    'url': 'www.lovewhatyoudo.com',
    'likes': 0,
    'user': {
      'username': 'naziboy95',
      'name': 'Frederik Whiteman',
      'password': 'hitler'
    }
  }

  const component = render(
    <Blog blog = {data}/>
  )

  const button = component.getByText('View')

  fireEvent.click(button)

  expect(component.container).toHaveTextContent('www.lovewhatyoudo.com')
  expect(component.container).toHaveTextContent('0')

})