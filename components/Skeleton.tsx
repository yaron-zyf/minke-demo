const Skeleton = () => {
  return <div className="border border-blue-300 shadow rounded-xl p-4 w-80 h-[400px]">
    <div className="animate-pulse">
      <div className="bg-slate-200 w-full h-72"/>
      <div className="mt-3 bg-slate-200 w-full h-4 rounded-xl"/>
      <div className="mt-3 bg-slate-200 w-full h-4 rounded-xl"/>
      <div className="mt-3 w-full flex">
        <span className="w-1/4 inline-block bg-slate-200 h-4 rounded-xl"/>
        <span className="w-1/4 inline-block bg-slate-200 h-4 rounded-xl ml-3 flex-1"/>
      </div>
    </div>
  </div>
}

export default Skeleton