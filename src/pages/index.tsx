import { getSession, GetSessionOptions } from 'next-auth/client'
import { Session } from 'next-auth'
import Head from 'next/head'
import Login from '../components/Login'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'

interface Props {
  session: Session
}

export default function Home({ session }: Props) {
  if (!session) return <Login />

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Facebook</title>
      </Head>

      <Header />

      <main className="flex">
        <Sidebar />
        <Feed />
      </main>
    </div>
  )
}

export async function getServerSideProps(context: GetSessionOptions) {
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
}
