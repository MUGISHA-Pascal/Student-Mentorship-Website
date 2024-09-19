/* eslint-disable @typescript-eslint/no-unused-vars */
import Partners from "../components/home/partners";
import Services from "../components/home/services";
import WhyUs from "../components/home/whyUs";
import How from "../components/home/how";
import Faq from "../components/home/faq";
import Consultancy from "../components/home/consultancy";
import Testimonial from "../components/home/testimonials/index";
import Intro from "../components/home/intro";

const Home = () => {
    return (
        <div className="relative overflow-x-hidden overflow-y-hidden">
            <Intro />
            <Partners />
            <Services />
            <WhyUs />
            <How />
            <div className="bg-[url('/svgs/mesh.svg')] bg-center bg-no-repeat mt-14">
                <Testimonial />
            </div>
            <Faq />
            <Consultancy />
        </div>
    )
}

export default Home