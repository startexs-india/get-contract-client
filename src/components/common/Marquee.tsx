import Marquee from "react-fast-marquee";

const MarqueeComponent = () => {
    return (
        <div className="bg-[#0056b3] text-white text-sm font-bold py-[6px]">
            <Marquee speed={50}>
                New Tenders Released | AI Smart Search | Government Projects Live | Register Now
            </Marquee>
        </div>
    )
}

export default MarqueeComponent;