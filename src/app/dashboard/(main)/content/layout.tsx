import { Roboto } from "next/font/google";
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});
const contentLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="w-full max-w-screen h-full flex flex-col">
      <h1 className={`text-2xl p-4 ${roboto.className} font-bold`}>
        Channel Content
      </h1>
      {children}
    </div>
  );
};
export default contentLayout;
