//import { AppProvider } from '../context';
import Header from "./Header";


const Layout = ({children}) => {
	//const { header, footer } = headerFooter || {};
	return (
    <>
      <div>
        <Header />
        <main className="container mx-auto py-4 min-h-50vh">{children}</main>
      </div>
    </>
  );
}
