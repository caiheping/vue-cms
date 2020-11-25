import { Message } from 'element-ui'

export function httpResponse (message = 'success', type = 'success') {
  Message({
    type: type,
    message: message
  })
}
