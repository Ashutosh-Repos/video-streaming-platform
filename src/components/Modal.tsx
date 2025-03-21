const Model = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="w-full h-full grid place-items-center bg-green z-20 absolute backdrop-blur-[2px]">
      <div className="w-[40rem] h-[30rem] grid place-items-center">
        {children}
      </div>
    </div>
  );
};

export default Model;
