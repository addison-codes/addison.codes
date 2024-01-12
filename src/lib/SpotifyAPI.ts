import querystring from 'querystring'

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`
const TOP_TRACK_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=1&offset=0`
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN

const getAccessToken = async () => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })

  return response.json()
}

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken()

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken()
  return fetch(TOP_TRACK_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}

export default async function getTrackItem() {
  const response = await getNowPlaying()
  if (response.status === 204 || response.status > 400) {
    const response = await getTopTracks()
    if (response.status === 204 || response.status > 400) {
      return false
    }
    const song = await response.json()
    const albumImageUrl = song.items[0].album.images[0].url
    const artist = song.items[0].artists
      .map((_artist: { name: string }) => _artist.name)
      .join(', ')
    const songUrl = song.items[0].external_urls.spotify
    const title = song.items[0].name

    return {
      albumImageUrl,
      artist,
      songUrl,
      title,
    }
  } else {
    const song = await response.json()
    if (song.is_playing === true) {
      const albumImageUrl = song.item.album.images[0].url
      const artist = song.item.artists
        .map((_artist: { name: string }) => _artist.name)
        .join(', ')
      const isPlaying = song.is_playing
      const songUrl = song.item.external_urls.spotify
      const title = song.item.name

      return {
        albumImageUrl,
        artist,
        isPlaying,
        songUrl,
        title,
      }
    } else {
      const response = await getTopTracks()
      if (response.status === 204 || response.status > 400) {
        return false
      }

      const song = await response.json()
      const albumImageUrl = song.items[0].album.images[0].url
      const artist = song.items[0].artists
        .map((_artist: { name: string }) => _artist.name)
        .join(', ')
      const songUrl = song.items[0].external_urls.spotify
      const title = song.items[0].name

      return {
        albumImageUrl,
        artist,
        songUrl,
        title,
      }
    }
  }
}
