import PostBox from "./PostBox";
import PostField from "./PostField";
import data from '../../data.json'
import Lottie from 'lottie-react'

function Home() {

  return (
    <div className=" min-h-screen h-full w-full flex flex-col items-center bg-[#152131] ">
      <div className="w-full flex flex-col items-center space-y-10 py-10">
        <div className="h-40 w-40 flex flex-col items-center">
         <Lottie animationData={data} loop={true}/>
         <h1 className="text-white font-bold text-3xl animate-pulse tracking-wider">Welcome</h1>
        </div>
        {/* CREATE */}
        <PostField />

        {/* DISPLAYS ALL DATA */}
        <PostBox />
      </div>
    </div>
  );
}

export default Home;
