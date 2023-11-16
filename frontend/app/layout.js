import {Montserrat} from 'next/font/google'
import './globals.css'
import {Navigation} from './navigation'
import {Footer} from './footer'
import Head from 'next/head'
import Link from 'next/link'

import manifest from "./manifest";

const montserrat = Montserrat({subsets: ['latin', 'cyrillic']})

export const metadata = {
    title: 'Books: твой личный помощник',
    description: 'Веб-приложение для сбора, сортировки и поиска книг по различным параметрам',
}

export default function RootLayout({children}) {
    return (
        <html lang="ru">
        <Head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description}/>
            <link rel="apple-touch-icon" sizes="180x180" href='/apple-touch-icon.png'></link>
            <link rel="icon" type="image/png" sizes="32x32" href='/favicon-32x32.png'></link>
            <link rel="icon" type="image/png" sizes="16x16" href='/favicon-16x16.png'></link>
            <link rel="manifest" href={manifest}></link>
        </Head>
        <body className={montserrat.className}>
        <Navigation/>
        <div className="page">
            {children}
        </div>
        <Footer/>
        </body>
        </html>
    )
}
