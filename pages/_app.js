import '../styles/globals.css'
import  Layout  from '../components/Layout'
function MyApp({ Component, pageProps }) {
  // const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
