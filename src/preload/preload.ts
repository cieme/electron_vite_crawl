import { ipcRenderer, net } from 'electron'

window.addEventListener('DOMContentLoaded', () => {
  const request = net.request(
    'http://218.60.151.1:8082/gp-webapp-supplier/supplier/product/new?catalogId=04fcbff048ce11eab278fa163e511db2&backendCatalogId=1000071&op=new',
  )
  request.on('response', (response) => {
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`)
    })
  })
  request.end()
})
