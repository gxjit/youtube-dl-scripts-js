const { spawnSync } = require('child_process')
const { cwd } = require('process')

if (cwd() !== __dirname) {
  throw new Error('Invalid script directory.')
}

const options = {
  plStart: '1',
  plEnd: '100',
  format: '140/250/139/249/bestaudio',
  url:
    'https://www.youtube.com/playlist?list=PLSQl0a2vh4HB9UeibLURBlcdR4XzputM9',
  output:
    '%(playlist_uploader)s/%(playlist_title)s/%(playlist_index)s - %(title)s.%(ext)s',
  ignoreErrors: false
}

const getEm = opts => {
  const { ignoreErrors, format, output, url, plStart, plEnd } = opts

  const argsArray = [
    ignoreErrors ? '--ignore-errors' : '--abort-on-error',
    '--yes-playlist',
    '--playlist-start',
    plStart,
    '--playlist-end',
    plEnd,
    '--format',
    format,
    '--output',
    output,
    url
  ]

  spawnSync('youtube-dl', argsArray, {
    cwd: cwd(),
    stdio: ['inherit', 'inherit', 'inherit']
  })
}

getEm(options)

// 140 = Audio | 22 = Video
// 140/250/139/249/bestaudio  256k 141/251 = Audio | Video = 22/45/18/44/best  1080 37/46
// Use ffmpeg to correct container format
// youtube-dl -o '%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s' https://www.youtube.com/playlist?list=PLwiyx1dc3P2JR9N8gQaQN_BCvlSlap7re
