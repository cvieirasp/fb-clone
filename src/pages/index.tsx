import { getSession, GetSessionOptions } from 'next-auth/client'
import { Session } from 'next-auth'
import Head from 'next/head'
import Login from '../components/Login'
import Header from '../components/Header'

interface Props {
  session: Session
}

export default function Home({ session }: Props) {
  if (!session) return <Login />

  return (
    <div>
      <Head>
        <title>Facebook</title>
      </Head>

      <Header />
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
