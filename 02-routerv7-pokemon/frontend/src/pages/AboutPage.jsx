
const AboutPage = () => {
  return (
    <div className="flex justify-center items-center text-center">
      <div className="flex flex-col justify-center items-center text-center shadow-sm shadow-pink-500 w-150 h-150 mt-10 rounded-4xl">
        <img src="https://res.cloudinary.com/fronda/image/upload/f_auto,q_auto:eco,c_fill,g_center,w_450,h_600/productos/fol/11188/11188236_1.jpg?17-01-2024" 
        alt="profile.png" className="w-30 h-30 rounded-full"/>
        <h1 className="text-4xl font-bold m-10">Nicole Yranzo Ghisolfi</h1>
        <div className="flex justify-evenly w-full mt-4 text-3xl text-gray-600 ">
          <a href="https://www.instagram.com/nicoleeyranzo/" target="_blank"><i className="fa-brands fa-instagram transition-colors duration-200 hover:text-pink-500 " ></i></a>
          <a href="https://github.com/niyranzo" target="_blank"><i className="fa-brands fa-github transition-colors duration-200 hover:text-black"></i></a>
          <a href="https://www.linkedin.com/in/nicole-yranzo-ghisolfi-1a2153304/" target="_blank"><i className="fa-brands fa-linkedin transition-colors duration-200 hover:text-blue-600"></i></a>
        </div>
      </div>
    </div>
  )
}

export default AboutPage