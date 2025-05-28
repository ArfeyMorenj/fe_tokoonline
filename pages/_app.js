import '../styles/global.css'; // Tailwind CSS dan gaya global
import '../styles/styles.css'; // Gaya kustom global

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}