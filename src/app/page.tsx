import Image from "next/image";
import Section2 from "../components/Section2";
import Link from "next/link";
 
export default function Home() {
  return (
    <>
      <div className="relative bg-slate-400 h-[600px] flex justify-center items-center">
        <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover" style={{ opacity: '0.6' }}>
          <source src="/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
          <div className="content-container">
            <h1 className="text-white font-bold text-4xl md:text-6xl mb-6">
              <span className='font-extrabold text_color_variation text-2x1 leading-[1.75rem] m-2'>Welcome to CoLabCrafters</span>
            </h1>
            <p className="text-white font-semibold text-xl md:text-xl mb-4">Empowering collaboration, inspiring innovation.</p>
            <p className="text-white  font-semibold  text-xl md:text-xl mb-4">Explore our creative solutions and join our community of innovators.</p>
            <p className="text-white  font-semibold  text-xl md:text-xl mb-4">Are you ready to unleash your creativity and be part of something bigger?</p>
            <p className="text-white   font-semibold  text-xl md:text-xl mb-4">Join CoLabCrafters today and connect with like-minded individuals!</p>
          </div>
          <div className="button-container mt-8  ">
            <Link href='/LoginSignup' type="button" className="bg-blue-500 hover:bg-[#11232e] text-white font-bold py-2 px-4 rounded-full ">
              Join Us
            </Link>
          </div>
        </div>
      </div>
      <Section2 />
    </>
  );
}
