//import { AppProvider } from '../context';
import Header from "./myheader";
import Footer from "./footer";
import { AppProvider } from "../context";

const Layout = ({ children, headerFooter }) => {
  const { header, footer } = headerFooter || {};
  return (
    <AppProvider>
      <div>
        <Header header={header} />
        <main className="container mx-auto py-4 min-h-50vh">{children}</main>
        <Footer footer={footer} />
      </div>
    </AppProvider>
  );
};

export default Layout;