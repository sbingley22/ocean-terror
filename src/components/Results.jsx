/* eslint-disable react/prop-types */

const Results = ({ setPage, scores }) => {
  return (
    <div 
      className="container mx-auto flex-grow flex-col flex justify-evenly items-center text-white"
      style={{ backgroundImage: "url('./emptyBoat.jpg", backgroundSize: "auto 100%", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
    >
      <p className="text-2xl p-4 rounded-md" style={{ background: "radial-gradient(rgba(0,0,0,0.95), rgba(0,0,0,0.45))"}}>
        Last score: {scores.lastScore}
      </p>
      <p className="text-2xl p-4 rounded-md" style={{ background: "radial-gradient(rgba(0,0,0,0.95), rgba(0,0,0,0.45))"}}>
        High score: {scores.highScore}
      </p>
      <div className="h-2/5" />
      <button className="text-2xl p-4 rounded-md bg-slate-900 hover:bg-slate-800" onClick={()=>setPage(9)}>
        Play Again?
      </button>
    </div>
  )
}

export default Results