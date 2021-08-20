import React, { useEffect, useRef, useState } from 'react'

import { useToast, Flex, Image, Tooltip, Text, Link, useMediaQuery } from '@chakra-ui/react'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { SearchIcon, CloseIcon } from '@chakra-ui/icons'

import Container from '../../components/Container'
import Card from '../../components/Card'
import Header from '../../components/Header'
import Table from '../../components/Table'
import Input from '../../components/Input'
import ButtonGradient from '../../components/ButtonGradient'

import api from '../../services/api'

import DefaultSongImage from '../../assets/images/Images-rafiki.svg'
import SoundcloudIcon from '../../assets/images/Soundcloud-Icon.svg'
import SpotifyIcon from '../../assets/images/Spotify.svg'
import YoutubeIcon from '../../assets/images/youtube-red-circle.svg'

interface Artist {
  id: number;
  name: string;
  location: string;
  commaSeparatedTags: string;
  youtubeUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  soundcloudUrl: string;
}

interface Song {
  id: string;
  soundcloudUrl: string;
  commaSeparatedTags: string;
  albumName: string;
  managerName: string;
  managerUrl: string;
  labelName: string;
  labelUrl: string;
  imageUrl: string;
  location: string;
  youtubeId?: any;
  spotifyId: string;
  artists: Artist[];
  name: string;
  ownReview: string;
}

interface FormDataProps {
  search: string
}

const Home = () => {
  const toast = useToast()
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)
  const [showClose, setShowClose] = useState(false)

  const formRef = useRef<FormHandles>(null)

  const [isLargerTo610] = useMediaQuery('(min-width: 610px)')

  useEffect(() => {
    fetchSongs()
  }, [])

  const fetchSongs = async () => {
    setLoading(true)
    try {
      const response = await api.get('/songs', {
        params: {
          offset: 45,
          limit: 100
        }
      })

      setSongs(response.data.result as Song[])
    } catch (err) {
      const message = err.response ? err.response.data.mensagem : err.message

      toast({
        title: 'Failed to feetch songs',
        description: message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
        variant: 'left-accent'
      })
    }
    setLoading(false)
  }

  const searchSongs = async (search:string) => {
    setLoading(true)
    try {
      const response = await api.get(`/songs/search/${encodeURI(search)}`)

      setSongs(response.data.result as Song[])
      setShowClose(true)
    } catch (err) {
      const message = err.response ? err.response.data.mensagem : err.message

      toast({
        title: 'Failed to search songs',
        description: message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
        variant: 'left-accent'
      })
    }
    setLoading(false)
  }

  const handleClose = async () => {
    if (formRef && formRef.current) {
      setShowClose(false)
      formRef.current.reset()
      await fetchSongs()
    }
  }

  const handleSearchSongs = async (data: FormDataProps) => {
    if (formRef && formRef.current) {
      try {
        formRef.current.setErrors({})

        const schema = Yup.object().shape({
          search: Yup.string()
            .required('Required')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        searchSongs(data.search)
      } catch (err) {
        const validationErrors:{[key: string]: string} = {}

        if (err instanceof Yup.ValidationError) {
          err.inner.forEach(error => {
            validationErrors[error.path as string] = error.message
          })

          formRef.current.setErrors(validationErrors)
        }
      }
    }
  }

  return (
    <>
      <Header />
      <Container paddingY={6}>
      <Text fontSize="xl" fontWeight="bold" marginY={2}>Search Songs</Text>
        <Form
          ref={formRef}
          onSubmit={handleSearchSongs}
        >
          <Flex>
            <Input type="text" name="search" placeholder="Search by Name, Locate, musical genre..." />

            {!showClose && (
              <ButtonGradient type="submit" isLoading={loading} ml={2}>
                <SearchIcon />
              </ButtonGradient>
            )}

            {showClose && (
              <ButtonGradient onClick={handleClose} isLoading={loading} ml={2}>
                <CloseIcon />
              </ButtonGradient>
            )}
          </Flex>
        </Form>

        <Text fontSize="l" fontWeight="bold" mt={4} mb={2}>Songs</Text>

        <Card w="100%">

          {isLargerTo610 && (
            <Table
              tableName="pendencias"
              columns={
                [
                  {
                    width: 10,
                    Header: 'Title',
                    accessor: 'title'
                  },
                  {
                    Header: 'Album',
                    accessor: 'album'
                  },
                  {
                    Header: 'Play',
                    accessor: 'play'
                  }
                ]
              }
              data={songs.map((song: Song) => {
                const fixedImageUrl = !song.imageUrl.includes('anote-public') ? null : song.imageUrl
                return {
                  title: (
                    <Flex alignItems="center">
                      <Image src={fixedImageUrl || DefaultSongImage.src} w="50px" h="50px" borderRadius={4} />
                      <Flex ml={2} direction="column">
                        <Text fontSize={16} color="#0c7ab9" fontWeight="bold">{song.labelName}</Text>
                        <Text fontSize={12}>{song.artists.map((artist:Artist) => artist.name).join(', ')}</Text>
                      </Flex>
                    </Flex>
                  ),
                  album: song.albumName,
                  play: (
                    <Flex>
                      {song.soundcloudUrl && (
                        <Tooltip label="Play on SoundCloud">
                          <Link target="_blank" href={song.soundcloudUrl}>
                            <Image cursor="pointer" src={SoundcloudIcon.src} w="30px" h="30px" ml={2}/>
                          </Link>
                        </Tooltip>
                      )}

                      {song.spotifyId && (
                        <Tooltip label="Play on Spotify">
                          <Link target="_blank" href={`${process.env.NEXT_PUBLIC_PLAY_SPOTIFY_URL}${song.spotifyId}`}>
                            <Image cursor="pointer" src={SpotifyIcon.src} w="30px" h="30px" ml={2}/>
                          </Link>
                        </Tooltip>
                      )}

                      {song.youtubeId && (
                        <Tooltip label="Play on Youtube">
                          <Link target="_blank" href={`${process.env.NEXT_PUBLIC_PLAY_YOUTUBE_URL}${song.youtubeId}`}>
                            <Image cursor="pointer" src={YoutubeIcon.src} w="30px" h="30px" ml={2}/>
                          </Link>
                        </Tooltip>
                      )}
                    </Flex>
                  )
                }
              })}
            />
          )}

          {!isLargerTo610 && (
            <Table
              tableName="pendencias"
              columns={
                [
                  {
                    width: 10,
                    Header: 'Title',
                    accessor: 'title'
                  },
                  {
                    Header: 'Play',
                    accessor: 'play'
                  }
                ]
              }
              data={songs.map((song: Song) => {
                const fixedImageUrl = !song.imageUrl.includes('anote-public') ? null : song.imageUrl
                return {
                  title: (
                    <Flex alignItems="center">
                      <Image src={fixedImageUrl || DefaultSongImage.src} w="50px" h="50px" borderRadius={4} />
                      <Flex ml={2} direction="column">
                        <Text fontSize={16} color="#0c7ab9" fontWeight="bold">{song.labelName}</Text>
                        <Text fontSize={12}>{song.artists.map((artist:Artist) => artist.name).join(', ')}</Text>
                      </Flex>
                    </Flex>
                  ),
                  album: song.albumName,
                  play: (
                    <Flex>
                      {song.soundcloudUrl && (
                        <Tooltip label="Play on SoundCloud">
                          <Link target="_blank" href={song.soundcloudUrl}>
                            <Image cursor="pointer" src={SoundcloudIcon.src} w="30px" h="30px" ml={2}/>
                          </Link>
                        </Tooltip>
                      )}

                      {song.spotifyId && (
                        <Tooltip label="Play on Spotify">
                          <Link target="_blank" href={`${process.env.NEXT_PUBLIC_PLAY_SPOTIFY_URL}${song.spotifyId}`}>
                            <Image cursor="pointer" src={SpotifyIcon.src} w="30px" h="30px" ml={2}/>
                          </Link>
                        </Tooltip>
                      )}

                      {song.youtubeId && (
                        <Tooltip label="Play on Youtube">
                          <Link target="_blank" href={`${process.env.NEXT_PUBLIC_PLAY_YOUTUBE_URL}${song.youtubeId}`}>
                            <Image cursor="pointer" src={YoutubeIcon.src} w="30px" h="30px" ml={2}/>
                          </Link>
                        </Tooltip>
                      )}
                    </Flex>
                  )
                }
              })}
            />
          )}
        </Card>
      </Container>
    </>
  )
}

export default Home
