export default function manifest() {
    return {
        name: 'Books: твой личный помощник',
        short_name: 'Books',
        description: 'Собирай книги, сортируй их, ищи по имени и многое другое!',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#fff',
        icons: [
            {
                src: '/android-chrome-192x192',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/android-chrome-512x512',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}