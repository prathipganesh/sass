// // app/layout.tsx
// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import './globals.scss';  // Now this will work

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Dulwich College | Tuition Payment',
//   description: 'International School Bangkok - Fee Payment Dashboard',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <head>
//         <link
//           rel="stylesheet"
//           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
//         />
//       </head>
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }
import type { Metadata } from 'next'
import "./globals.scss";

export const metadata: Metadata = {
  title: 'Sass Buttons UI Kit',
  description: 'Learn Next.js + Sass by building button components',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600;14..32,700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}