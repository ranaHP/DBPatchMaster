import { ipcRenderer, contextBridge } from 'electron'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args
    return ipcRenderer.on(channel, (event, ...args) => listener(event, ...args))
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args
    return ipcRenderer.off(channel, ...omit)
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args
    return ipcRenderer.send(channel, ...omit)
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args
    return ipcRenderer.invoke(channel, ...omit)
  },

  copyFile: (sourcePath: string, destinationPath: string) => ipcRenderer.invoke('file:copy', { sourcePath, destinationPath }),
  writeFile: (filePath: string, content: string) => ipcRenderer.invoke('file:write', { filePath, content }),
  deleteFile: (filePath: string) => ipcRenderer.invoke('file:delete', filePath)

  // You can expose other APTs you need here.
  // ...
})
