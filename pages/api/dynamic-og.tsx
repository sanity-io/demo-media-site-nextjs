import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

import { getClient } from '../../lib/sanity.server'

export const config = {
  runtime: 'experimental-edge',
}

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const username = searchParams.get('username')
  const type = searchParams.get('type')
  const id = searchParams.get('id')
  const secret = searchParams.get('secret')
  if (!id || !type) {
    return new ImageResponse(<>{'Visit with "?type=&id="'}</>, {
      width: 1200,
      height: 630,
    })
  }

  // Validate type
  if (
    !['article', 'person', 'section', 'podcast', 'newsletter'].includes(type)
  ) {
    throw new Error('Invalid type')
  }

  const doc = await getClient(false).fetch(
    `*[_type == "${type}" && _id == $id][0]`,
    { id }
  )

  console.log(doc)

  if (type === 'article') {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}
        >
          <div tw="bg-purple-300 h-full flex">
            <div tw="h-full flex flex-col p-8 py-12">
              <h2 tw="flex items-center text-3xl sm:text-4xl font-extrabold tracking-tight text-black text-left">
                <span tw="text-purple-300 inline-block pr-2">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.977 18.273a8.803 8.803 0 0 1-3.494-.7 9.172 9.172 0 0 1-2.872-1.934 9.295 9.295 0 0 1-1.943-2.872 8.66 8.66 0 0 1-.69-3.494 8.867 8.867 0 0 1 .707-3.495 9.191 9.191 0 0 1 1.943-2.863A9.002 9.002 0 0 1 6.49.972a8.742 8.742 0 0 1 3.486-.7c1.245 0 2.41.234 3.495.7a8.878 8.878 0 0 1 2.863 1.943 9.07 9.07 0 0 1 1.935 2.863 8.868 8.868 0 0 1 .707 3.495 8.66 8.66 0 0 1-.69 3.494 9.045 9.045 0 0 1-4.807 4.807 8.824 8.824 0 0 1-3.503.699Z"
                      fill="#BB9FF9"
                    />
                  </svg>
                </span>{' '}
                Reach
              </h2>
              <div tw="flex flex-col md:flex-row flex-wrap w-full pt-4 md:items-center justify-between">
                <h2 tw="flex flex-col text-4xl sm:text-7xl font-black tracking-tight leading-none text-gray-900 text-left">
                  {doc?.title || 'Untitled'}
                </h2>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          color: 'black',
          background: '#f6f6f6',
          width: '100%',
          height: '100%',
          paddingTop: 50,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="avatar"
          width="256"
          src={`https://github.com/${username}.png`}
          style={{
            borderRadius: 128,
          }}
        />
        <p>github.com/{username}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
