import Image from "next/image";

const Hero = () => {
    return (
        <section className="h-[300px] relative">
            <Image
                src="/assets/images/banner.jpg"
                alt="Banner"
                fill
                className="object-cover"
                priority
            />
        </section>
    );
};

export default Hero;