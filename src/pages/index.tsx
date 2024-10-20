import { motion } from 'framer-motion'
import { get } from 'http'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'
import { useEffect } from 'react'
import { Cursor, useTypewriter } from 'react-simple-typewriter'

import Card from '~/components/Card'
import Footer from '~/components/Footer'
import Logo from '~/components/Logo'
import ParallaxText from '~/components/ParallaxText'
import Section from '~/components/Section'
import SpotifyNowPlaying from '~/components/SpotifyNowPlaying'
import getMyPosts from '~/lib/DevToAPI'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPosts, type Post, postsQuery } from '~/lib/sanity.queries'
// import getRecentlyPlayed from '~/lib/SteamAPI'
import type { SharedPageProps } from '~/pages/_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    sanityPosts: Post[]
    devToPosts: any[]
    // steamData: any
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const sanityPosts = await getPosts(client)
  const devToPosts = await getMyPosts()
  // const steamData = await fetch(`http://localhost:3000/api/steam`).then(
  //   (res) => {
  //     return res.json()
  //   },
  // )

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      sanityPosts,
      devToPosts,
      // steamData,
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [posts] = useLiveQuery<Post[]>(props.sanityPosts, postsQuery)
  const [text, count] = useTypewriter({
    words: [
      'Travel',
      'Drink Coffee',
      'Collect Typewriters',
      'Play Video Games',
      'Watch Anime',
    ],
    loop: true,
    delaySpeed: 2000,
  })

  useEffect(() => {
    const sortedDevPosts = props.devToPosts.map(
      (post: {
        title: string
        description: string
        url: string
        cover_image: string
        published_at: string
        slug: any
        devPost: boolean
        _type?: string
        _id?: any
        body?: any
      }) => {
        return {
          title: post.title,
          excerpt: post.description,
          url: post.url,
          mainImage: post.cover_image,
          _createdAt: post.published_at,
          slug: post.slug,
          devPost: true,
          _type: 'post',
          _id: post._id,
          body: post.body,
        }
      },
    )

    posts.push(...sortedDevPosts)
  }, [posts, props.devToPosts])

  // console.log(props.steamData.response.games)

  return (
    <>
      <Head>
        <title>Addison.Codes</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-full pb-16 bg-black selection:text-primary selection:bg-accent">
        <section id="hero" className="container mx-auto mb-48">
          <motion.div
            initial={{
              y: 800,
              opacity: 0,
              scale: 2.2,
            }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.5,
            }}
            className="pt-12 mx-auto w-96 h-96"
          >
            <Logo className="mx-auto transition duration-700 animate-pulse fill-primary hover:fill-accent" />
          </motion.div>
          {/* <BackgroundEffect /> */}
          <h1 className="tracking-wide text-center text-white uppercase text-9xl font-display">
            Addison<span className="text-primary">.</span>Codes
          </h1>
          <div className="flex mt-20 justify-evenly">
            <div className="flex flex-wrap justify-center">
              <div className="border-4 rounded-full border-accent">
                <Image
                  width={320}
                  height={320}
                  src="/AddisonPicNew.jpg"
                  alt="Addison in a hoodie"
                  className="h-auto max-w-full align-middle border-none rounded-full shadow"
                />
              </div>
            </div>
            <div>
              <h2 className="text-5xl text-center text-white">
                Hi!{' '}
                <span className="italic">
                  I&apos;m{' '}
                  <span className="underline text-accent">Addison</span>
                </span>
                .
              </h2>
              <h3 className="pt-12 text-4xl text-center text-white">
                I write <span className="text-secondary">code</span>.
              </h3>
              <h3 className="pt-20 text-3xl text-center text-white">
                And do other things...
                <br />
                <span className="text-accent">
                  {text}
                  <Cursor cursorColor="#BB4430" />
                </span>
              </h3>
            </div>
          </div>
        </section>
        <ParallaxText baseVelocity={2}>
          <span className="text-primary">
            Development Design Software Architecture&nbsp;
          </span>
        </ParallaxText>
        <ParallaxText baseVelocity={-2}>
          <span className="text-accent">
            ソフトウェア開発 | ウェブデザイン | プログラミング
          </span>
        </ParallaxText>
        <ParallaxText baseVelocity={1}>
          <span className="text-secondary">Addison.Codes Addison.Codes</span>
        </ParallaxText>
        <Section heading="Latest Things I've Written">
          {posts.length ? (
            posts.map((post) => <Card key={post._id} post={post} />)
          ) : (
            <p>No posts :/</p>
          )}
        </Section>
        <Section heading="Current Media I Like">
          <SpotifyNowPlaying />
        </Section>
      </main>
      <Footer />
    </>
  )
}
