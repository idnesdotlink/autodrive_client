import windowDefinitions from './windowDefinitions.es6'
import { BrowserWindow } from 'electron'
import windowUrls from './windowUrls.es6'

let introWindow
let printerWindow
let flashing = false

export default function createMenu(targetWindow) {
  return [
    {
      label: 'Window',
      submenu: [
        {
          label: 'Minimize',
          role: 'minimize'
        },
        {
          label: 'Close',
          role: 'close'
        }
      ]
    },
    {
      label: 'Settings',
      submenu: [
        {
          label: 'Printer',
          click: () => {
            if (printerWindow === null || printerWindow === undefined) {
              const { printerDefinition } = windowDefinitions
              const { printerUrl } = windowUrls
              printerWindow = new BrowserWindow(printerDefinition)
              printerWindow.loadURL(printerUrl)
              printerWindow.webContents.on('did-finish-load', () => {
                printerWindow.show()
              })
            } else {
              printerWindow.close()
              printerWindow = null
            }
          }
        }
      ]
    },
    {
      label: 'Debug',
      submenu: [
        {
          label: 'Toggle Dev',
          role: 'toggledevtools'
        },
        {
          label: 'Reload',
          role: 'reload'
        },
        {
          label: 'Toggle Flash',
          click: () => {
            if (flashing) {
              targetWindow.flashFrame(false)
              flashing = false
            } else {
              targetWindow.flashFrame(true)
              flashing = true
            }
          }
        },
        {
          label: 'Toggle intro',
          click: () => {
            if (introWindow === null || introWindow === undefined) {
              const { introDefinition } = windowDefinitions
              const { introUrl } = windowUrls
              introWindow = new BrowserWindow(introDefinition)
              let showintro = function () {
                introWindow.center()
                introWindow.show()
              }
              introWindow.loadURL(introUrl)
              introWindow.webContents.on('did-finish-load', () => {
                showintro()
              })
            } else {
              introWindow.close()
              introWindow = null
            }
          }
        }
      ]
    }
  ]
}
