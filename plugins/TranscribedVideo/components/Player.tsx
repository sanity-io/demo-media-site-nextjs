import MuxPlayer from '@mux/mux-player-react'
import {ChangeEvent, useCallback, useEffect, useState} from 'react'
import {ObjectInputProps, ObjectMember, SanityDocument, useClient} from 'sanity'
import {ObjectInput} from 'sanity'

type PlayerProps = {
  defaultProps: ObjectInputProps
  videoFieldMember: ObjectMember
  useInputComponent: boolean
  onTimeUpdate: (e: ChangeEvent<HTMLVideoElement>) => void
  onPlay: (e: Event) => void
  onPlaying: (e: Event) => void
  onPause: (e: Event) => void
  onEnded: (e: Event) => void
}

//TODO: ITWBNI a user could switch back to the Mux Input to be able to change the referenced video asset or upload a new one.
//Currently, Mux input will throw errors if placed back into the DOM
//Try using visibility rules or incorporating the Mux input buttons into the Video player
export const Player = (props: PlayerProps) => {
  const [videoAssetDoc, setVideoAssetDoc] = useState<SanityDocument | null>(
    null
  )

  //@ts-expect-error
  const videoAssetId = props.videoFieldMember?.field?.value?.asset?._ref

  const client = useClient({apiVersion: '2021-06-07'})

  useEffect(() => {
    const fetchVideoAsset = async () => {
      client
        .fetch(`*[_id == $id][0]`, {id: videoAssetId})
        .then((videoAssetDoc) => {
          setVideoAssetDoc(videoAssetDoc)
        })
    }
    fetchVideoAsset()
  }, [videoAssetId, client])

  const player = useCallback(() => {
    if (videoAssetId && !props.useInputComponent) {
      return (
        <MuxPlayer
          streamType="on-demand"
          playbackId={videoAssetDoc?.playbackId as string}
          //@ts-ignore
          onTimeUpdate={props.onTimeUpdate}
          onPlay={props.onPlay}
          onPlaying={props.onPlaying}
          onPause={props.onPause}
          onEnded={props.onEnded}
          metadata={{
            //@ts-expect-error
            id: videoAssetDoc?.data?._id,
          }}
        />
      )
    } 
      return (
        <ObjectInput
          {...props.defaultProps}
          members={[props.videoFieldMember]}
        />
      )
    
  }, [videoAssetDoc, props])

  return player()
}
