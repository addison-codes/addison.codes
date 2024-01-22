const RECENTLY_PLAYED_ENDPOINT = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=F9F10CD9855EC04B84119F509A9C1A30&steamid=76561198006978698&format=json`

export default async function getRecentlyPlayed() {
  const res = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await res.json()
}
