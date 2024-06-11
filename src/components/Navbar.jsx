/* eslint-disable react/prop-types */

const Navbar = ({ page, setPage }) => {

  if (page === 9) return

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Ocean Terror</div>
        <div>
          <a href="#" onClick={()=>setPage(0)} className="mx-8 hover:text-blue-400">Home</a>
          <a href="#" onClick={()=>setPage(1)} className="mx-8 hover:text-blue-400">How to Play</a>
          <a href="#" onClick={()=>setPage(2)} className="mx-8 hover:text-blue-400">Results</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar