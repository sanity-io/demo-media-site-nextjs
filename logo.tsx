import {Flex, Text} from '@sanity/ui'
import React, {memo, useMemo} from 'react'

export const Logo = memo(function Logo(props: {type?: string}) {
  const type = props?.type || 'tech'
  const settings: Record<string, any> = useMemo(() => {
    return {
      lifestyle: {
        text: 'Lifestyle',
        background: '#8E64E8',
      },
      tech: {
        text: 'Technology',
        background: '#FFFFFF',
      },
      reviews: {
        text: 'Reviews',
        background: '#86DF9F',
      },
    }
  }, [])

  return (
    <Flex align="center" gap={3}>
      <svg
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.977 18.273a8.803 8.803 0 0 1-3.494-.7 9.172 9.172 0 0 1-2.872-1.934 9.295 9.295 0 0 1-1.943-2.872 8.66 8.66 0 0 1-.69-3.494 8.867 8.867 0 0 1 .707-3.495 9.191 9.191 0 0 1 1.943-2.863A9.002 9.002 0 0 1 6.49.972a8.742 8.742 0 0 1 3.486-.7c1.245 0 2.41.234 3.495.7a8.878 8.878 0 0 1 2.863 1.943 9.07 9.07 0 0 1 1.935 2.863 8.868 8.868 0 0 1 .707 3.495 8.66 8.66 0 0 1-.69 3.494 9.045 9.045 0 0 1-4.807 4.807 8.824 8.824 0 0 1-3.503.699Z"
          fill={settings?.[type].background}
        />
      </svg>
      <Text weight="medium">{settings?.[type].text}</Text>
    </Flex>
  )
})

export function TechLogo() {
  return <Logo type="tech" />
}

export function LifestyleLogo() {
  return <Logo type="lifestyle" />
}

export function ReviewsLogo() {
  return <Logo type="reviews" />
}

export function TechWorkspaceLogo() {
  return <WorkspaceLogo type="tech" />
}

export function LifestyleWorkspaceLogo() {
  return <WorkspaceLogo type="lifestyle" />
}

export function ReviewsWorkspaceLogo() {
  return <WorkspaceLogo type="reviews" />
}

export function HighFashionWorkspaceLogo() {
  return <WorkspaceLogo type="highFashion" />
}

export function OutdoorsWorkspaceLogo() {
  return <WorkspaceLogo type="outdoors" />
}

export function GossipWorkspaceLogo() {
  return <WorkspaceLogo type="gossip" />
}

export function EntertainmentWorkspaceLogo() {
  return <WorkspaceLogo type="entertainment" />
}
export const WorkspaceLogo = memo(function WorkspaceLogo(props: {
  type?: string
}) {
  const type = props?.type || 'tech'
  const logos: Record<string, any> = useMemo(() => {
    return {
      lifestyle: {
        background: '#BB9FF9',
        foreground: '#8E64E8',
      },
      tech: {
        background: '#111213',
        foreground: '#FFFFFF',
      },
      reviews: {
        background: '#86DF9F',
        foreground: '#119236',
      },
    }
  }, [])

  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill={logos[type].background} d="M0 0h50v50H0z" />
      <path
        d="M24.977 34.273a8.802 8.802 0 0 1-3.494-.7 9.171 9.171 0 0 1-2.872-1.934 9.294 9.294 0 0 1-1.943-2.872 8.66 8.66 0 0 1-.69-3.494 8.868 8.868 0 0 1 .707-3.495 9.192 9.192 0 0 1 1.943-2.863 9.002 9.002 0 0 1 2.863-1.943 8.741 8.741 0 0 1 3.486-.7c1.245 0 2.41.234 3.495.7a8.877 8.877 0 0 1 2.863 1.943 9.07 9.07 0 0 1 1.935 2.863 8.868 8.868 0 0 1 .707 3.495 8.66 8.66 0 0 1-.69 3.494 9.045 9.045 0 0 1-4.807 4.807 8.824 8.824 0 0 1-3.503.699Z"
        fill={logos[type].foreground}
      />
    </svg>
  )
})
