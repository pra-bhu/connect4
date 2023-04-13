export default function Reset({handleReset}:{handleReset:Function}) {
  return (
      <div className="flex justify-center md:m-3">
          <button 
            className="text-slate-800 border border-slate-800 hover:bg-slate-800 hover:text-white active:bg-slate-600 font-bold uppercase text-xs md:px-4 md:py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 md:w-16 md:h-16 md:mt-6 w-10 h-10 mt-4"
            onClick = {()=> handleReset()}>
            <i className="fa fa-refresh text-lg md:text-3xl" aria-hidden="true"></i>
          </button>
          {/* <button className = "bg-slate-800  border-t-2 border-l-2 border-white m-4 text-slate-50 h-12 w-16 text-xs md:text-lg md:h-16 md:w-24 rounded-lg shadow-[4.0px_8.0px_8.0px_rgba(162, 162, 162, 0.38)]" onClick = {()=> handleReset()}><strong>RESET</strong></button> */}
      </div>
  );
}