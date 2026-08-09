import Navbar from "../components/common/Navbar"
import Hero from "../components/home/Hero"
import Features from "../components/home/Features";
import HWI from "../components/home/HowItWorks";
import CTA from "../components/home/CTA";
import Footer from "../components/common/Footer";


function Home()
{
    return (
        <>
        <Navbar/>
        <main>
        <Hero/>
        <Features/>
         <HWI/>
         <CTA/>
     </main>
     <Footer/>
        </>
    
    );
}
export default Home;