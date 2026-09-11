import React from 'react'
import SocialPost from './SocialPost'

const SocialFeed = ({posts,colorValue}) => {
  return (
    <>
      {
        posts.map(post=>(
            <SocialPost key={post.id} post={post} colorValue={colorValue} />
        ))
      }
    </>
  )
}

export default SocialFeed
