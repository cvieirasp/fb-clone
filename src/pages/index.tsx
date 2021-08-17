import { getSession, GetSessionOptions } from 'next-auth/client'
import { Session } from 'next-auth'
import Head from 'next/head'

import Login from '../components/Login'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import Widgets from '../components/Widgets'
import { PostType } from '../types/post'
import { getPosts } from '../lib/db'

interface Props {
  session: Session
  posts: PostType[]
}

export default function Home({ session, posts }: Props) {
  if (!session) return <Login />

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Facebook</title>
      </Head>

      <Header />

      <main className="flex">
        <Sidebar />
        <Feed posts={posts} />
        <Widgets />
      </main>
    </div>
  )
}

export async function getServerSideProps(context: GetSessionOptions) {
  const session = await getSession(context)
  const docs = await getPosts()

  return {
    props: {
      session,
      posts: docs
    }
  }
}
