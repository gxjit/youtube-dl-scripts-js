const { spawnSync } = require('child_process')
const { cwd } = require('process')

if (cwd() !== __dirname) {
  throw new Error('Invalid script directory.')
}

const options = {
  format: '140/250/139/249/bestaudio',
  url: 'https://www.youtube.com/user/khanacademy/playlists',
  output:
    '%(playlist_uploader)s/%(playlist_title)s/%(playlist_index)s - %(title)s.%(ext)s',
  ignoreErrors: false
}

const getEm = opts => {
  const { ignoreErrors, format, output, url } = opts

  const argsArray = [
    ignoreErrors ? '--ignore-errors' : '--abort-on-error',
    '--yes-playlist',
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
// youtube-dl -o '%(uploader)s/%(playlist)s/%(playlist_index)s - %(title)s.%(ext)s' https://www.youtube.com/user/TheLinuxFoundation/playlists
