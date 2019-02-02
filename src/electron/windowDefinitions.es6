const introDefinition = {
  height: 400,
  useContentSize: false,
  width: 600,
  show: false,
  frame: false,
  alwaysOnTop: true,
  skipTaskbar: true,
  type: 'splash',
  defaultEncoding: 'UTF-8',
  transparent: true,
  resizable: false
}

const mainDefinition = {
  height: 600,
  minHeight: 600,
  useContentSize: false,
  minWidth: 800,
  width: 800,
  show: false,
  defaultEncoding: 'UTF-8'
}

const installDefinition = {
  height: 400,
  useContentSize: false,
  width: 600,
  show: false,
  alwaysOnTop: false,
  skipTaskbar: true,
  type: 'splash',
  defaultEncoding: 'UTF-8',
  transparent: false,
  resizable: false
}

export default {
  mainDefinition,
  introDefinition,
  installDefinition,
}
