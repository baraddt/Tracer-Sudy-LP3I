import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function MainLayout({ children }) {
    return (
        <>
            <Navbar />
            <div className="content">{children}</div>
            <Footer />
        </>
    );
}
