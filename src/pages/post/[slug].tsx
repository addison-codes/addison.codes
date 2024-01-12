import { PortableText } from '@portabletext/react'
import { getImageDimensions } from '@sanity/asset-utils'
import urlBuilder from '@sanity/image-url'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { createClient } from 'next-sanity'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/Container'
import { apiVersion, dataset, projectId } from '~/lib/sanity.api'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import {
  getPost,
  type Post,
  postBySlugQuery,
  postSlugsQuery,
} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    post: Post
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const post = await getPost(client, params.slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      post,
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [post] = useLiveQuery(props.post, postBySlugQuery, {
    slug: props.post.slug.current,
  })

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
  })

  const SampleImageComponent = ({
    value,
    isInline,
  }: {
    value: any
    isInline: Boolean
  }) => {
    const { width, height } = getImageDimensions(value)
    return (
      <img
        src={urlBuilder(client)
          .image(value)
          .width(isInline ? 100 : 800)
          .fit('max')
          .auto('format')
          .url()}
        alt={value.alt || ' '}
        loading="lazy"
        style={{
          // Display alongside text if image appears inside a block text span
          display: isInline ? 'inline-block' : 'block',

          // Avoid jumping around with aspect-ratio CSS property
          aspectRatio: width / height,
        }}
      />
    )
  }

  const components = {
    types: {
      image: SampleImageComponent,
      // Any other custom types you have in your content
      // Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
    },
  }

  return (
    <main className="pb-16 lg:pb-24 bg-secondary dark:bg-gray-900 antialiased">
      {/* <header
        className={`bg-[url('${
          post.mainImage
            ? urlForImage(post.mainImage).url()
            : 'https://source.unsplash.com/random/1600x600/?city,night'
        }')] w-full h-[460px] xl:h-[537px] bg-no-repeat bg-cover bg-center bg-blend-darken relative`}
      > */}
      <header
        className={`bg-[url('${
          post.mainImage
            ? urlForImage(post.mainImage).url()
            : 'https://source.unsplash.com/random/1600x600/?city,night'
        }')] w-full h-[460px] xl:h-[537px] bg-no-repeat bg-cover bg-center bg-blend-darken relative`}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
        <div className="absolute top-20 left-1/2 px-4 mx-auto w-full max-w-screen-xl -translate-x-1/2 xl:top-1/2 xl:-translate-y-1/2 xl:px-0">
          <span className="block mb-4 text-primary">
            Published at{' '}
            <a
              href="https://addison.codes"
              className="font-semibold text-accent hover:underline"
            >
              Addison.Codes
            </a>{' '}
            on {formatDate(post._createdAt)}
          </span>
          <h1 className="mb-4 max-w-4xl text-2xl font-extrabold leading-none text-accent sm:text-3xl lg:text-4xl">
            {post.title}
          </h1>
          <p className="text-lg font-normal text-white">{post.excerpt}</p>
        </div>
      </header>
      <div className="flex relative z-20 justify-between p-6 -m-36 mx-4 max-w-screen-xl bg-black rounded xl:-m-32 xl:p-9 xl:mx-auto">
        <article className="w-full max-w-none text-white format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <div className="prose prose-invert prose-slate  mx-auto">
            <PortableText value={post.body} components={components} />
          </div>
        </article>
        {/* <aside className="hidden xl:block" aria-labelledby="sidebar-label">
          <div className="xl:w-[336px] sticky top-6">
            <h3 id="sidebar-label" className="sr-only">
              Sidebar
            </h3>
            <div className="mb-8">
              <h4 className="mb-2 text-sm font-bold text-gray-900 dark:text-white uppercase">
                Flowbite News morning headlines
              </h4>
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                Get all the stories you need-to-know from the most powerful name
                in news delivered first thing every morning to your inbox
              </p>
              <button
                type="button"
                data-modal-target="newsletter-modal"
                data-modal-toggle="newsletter-modal"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 text-center w-full"
              >
                Subscribe
              </button>
            </div>
            <div className="mb-12">
              <h4 className="mb-4 text-sm font-bold text-gray-900 dark:text-white uppercase">
                Latest news
              </h4>
              <div className="mb-6 flex items-center">
                <a href="#" className="shrink-0">
                  <img
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/articles/image-1.png"
                    className="mr-4 max-w-full w-24 h-24 rounded-lg"
                    alt="Image 1"
                  />
                </a>
                <div>
                  <h5 className="mb-2 text-lg font-bold leading-tight dark:text-white text-gray-900">
                    Our first office
                  </h5>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Over the past year, Volosoft has undergone changes.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                  >
                    Read in 9 minutes
                  </a>
                </div>
              </div>
              <div className="mb-6 flex items-center">
                <a href="#" className="shrink-0">
                  <img
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/articles/image-2.png"
                    className="mr-4 max-w-full w-24 h-24 rounded-lg"
                    alt="Image 2"
                  />
                </a>
                <div>
                  <h5 className="mb-2 text-lg font-bold leading-tight dark:text-white text-gray-900">
                    Enterprise Design tips
                  </h5>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Over the past year, Volosoft has undergone changes.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                  >
                    Read in 14 minutes
                  </a>
                </div>
              </div>
              <div className="mb-6 flex items-center">
                <a href="#" className="shrink-0">
                  <img
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/articles/image-3.png"
                    className="mr-4 max-w-full w-24 h-24 rounded-lg"
                    alt="Image 3"
                  />
                </a>
                <div>
                  <h5 className="mb-2 text-lg font-bold leading-tight dark:text-white text-gray-900">
                    Partnered up with Google
                  </h5>
                  <p className="mb-2 text-gray-500 dark:text-gray-400">
                    Over the past year, Volosoft has undergone changes.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                  >
                    Read in 9 minutes
                  </a>
                </div>
              </div>
            </div>
            <div>
              <a
                href="#"
                className="flex justify-center items-center mb-3 w-full h-48 bg-gray-100 rounded-lg dark:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                Students and Teachers, save up to 60% on Flowbite Creative
                Cloud.
              </p>
              <p className="text-xs text-gray-400 uppercase dark:text-gray-500">
                Ads placeholder
              </p>
            </div>
          </div>
        </aside> */}
      </div>
    </main>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(postSlugsQuery)

  return {
    paths: slugs?.map(({ slug }: { slug: Text }) => `/post/${slug}`) || [],
    fallback: 'blocking',
  }
}


