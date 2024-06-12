/* eslint-disable react/prop-types */

const HowToPlay = ({ setPage }) => {
  return (
    <div className="container mx-auto flex-grow flex flex-col items-center  text-white"
      style={{ backgroundImage: "url(./sailerwoman2.jpg)", backgroundPosition: "center", backgroundSize: "auto 100%", backgroundRepeat: "no-repeat" }}
    >
      <div 
        className="container mx-auto flex flex-col justify-center items-center bg-gradient-to-b from-black to-transparent mt-0 pt-10 pb-52"
        style={{ }}
      >
        <p>Dodge obstacles and subdue the sea creatures.</p>
        <p>Once a sea creature jumps out of the water it will start damaging your boat. Click it to push it back down.</p>
        <p>Click your mouse / touch to the sides on the bottom halve of the screen to steer your boat.</p>
        <p>Survive as long as you can.</p>
      </div>
      <button className="text-2xl p-4 rounded-md bg-slate-900 hover:bg-slate-800 mt-0" onClick={()=>setPage(9)}>
        PLAY
      </button>
    </div>
  )
}

export default HowToPlay