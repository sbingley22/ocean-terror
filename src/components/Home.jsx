/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */


const Home = ({ setPage }) => {
  return (
    <div 
      className="container mx-auto flex flex-grow"
      style={{backgroundImage: "url('./sailerwoman1.jpg')", backgroundSize: "auto 100%", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}
    >
      <div 
        className="container mx-auto flex flex-col text-white"
      >
        <div 
        className="rounded-full p-10 flex flex-col items-center"
        style={{ background: "radial-gradient(circle at center, rgba(1,1,1,0.75), rgba(1,1,1,0.5)" }}
        >
          <h1 className="text-3xl font-bold mb-6 mt-6">
            You Can't Survive The Horrors Of The Ocean!
          </h1>
          <p className="mb-4">
            But you can try.
          </p>
          <p className="">
            As you were out fishing a sudden storm brewed and brought with it creatures from the deep.
          </p>
          <p className="">
            Can you find your way back to dry land?
          </p>
        </div>
        <button 
          className=" mx-auto mt-8 p-4 rounded-lg bg-slate-800 hover:bg-slate-900"
          onClick={()=>setPage(1)}
        >
          How To Play
        </button>
      </div>
    </div>
  )
}

export default Home