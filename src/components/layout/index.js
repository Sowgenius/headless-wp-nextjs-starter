//import { AppProvider } from '../context';
import Header from "./Header";
import Footer from "./myfooter";

const Layout = ({children}) => {
	//const { header, footer } = headerFooter || {};
	return (
    <>
      <div>
        <Header />
        <main className="container mx-auto py-4 min-h-50vh">{children}</main>
        <Footer />
      </div>
    </>
  );
}
