// const RECENTLY_PLAYED_ENDPOINT = `https://cors-anywhere.herokuapp.com/https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${process.env.NEXT_PUBLIC_STEAM_API_KEY}&steamid=76561198006978698&format=json`

// export default async function getRecentlyPlayed() {
//   const res = await fetch(RECENTLY_PLAYED_ENDPOINT, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*',
//     },
//   })

//   return await res.json()
// }
