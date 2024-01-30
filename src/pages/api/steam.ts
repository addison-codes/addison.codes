// import { NextApiRequest, NextApiResponse } from 'next'

// const RECENTLY_PLAYED_ENDPOINT = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${process.env.NEXT_PUBLIC_STEAM_API_KEY}&steamid=76561198006978698&format=json`

// async function getRecentlyPlayed() {
//   const res = await fetch(RECENTLY_PLAYED_ENDPOINT, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': '*',
//     },
//   })
//   return await res.json()
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   const data = await getRecentlyPlayed()
//   res.status(200).json(data)
// }
