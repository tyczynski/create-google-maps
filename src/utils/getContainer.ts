import { Options } from '../types'

/**
 * Gets element from selector or returns parament if is instance of Element
 *
 * @param container
 */
export const getContainer = (container: Options['container']) => {
  if (typeof container === 'string') {
    return document.querySelector(container)
  } else if (container instanceof Element) {
    return container
  }

  return null
}
