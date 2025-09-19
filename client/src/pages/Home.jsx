import BlogList from "../components/BlogList"
import Footer from "../components/Footer"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import Newsletter from "../components/Newsletter"

const Home = () => {
    return (
        <>
            <Navbar />
            <Header />
            <BlogList />
            <Newsletter />
            <Footer/>
        </>
    )
}

export default Home
