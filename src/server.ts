import App from './app'
import * as Config from './config'

const { IP: HOST_IP, PORT: HOST_PORT } = Config

App.listen(HOST_PORT, () => {
  console.log('Server running - ', HOST_PORT, HOST_IP)
})
