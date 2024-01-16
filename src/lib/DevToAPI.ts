const MY_POSTS_ENDPOINT = `https://dev.to/api/articles?username=addisoncodes`

export default async function getMyPosts() {
  const res = await fetch(MY_POSTS_ENDPOINT, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await res.json()
}
