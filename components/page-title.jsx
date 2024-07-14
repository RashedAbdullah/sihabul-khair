const PageTitle = ({ children }) => {
    return (
      <div className="text-3xl flex justify-center my-5 font-bold">
        <div className="mb-3 pb-2 border-b border-slate-800 px-20 text-slate-800 relative">
          <div className="h-3 w-3 bg-slate-800 rounded-full absolute right-0 -bottom-[6px]" />
          <div className="h-3 w-3 bg-slate-800 rounded-full absolute left-0 -bottom-[6px]" />
          <h2>{children}</h2>
        </div>
      </div>
    );
  };
  
  export default PageTitle;