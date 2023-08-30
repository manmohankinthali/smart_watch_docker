import React from "react";
import { HomeButton } from "./HomeButtons";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="text-5xl mt-64 flex gap-14 m-10 justify-between">
        <div className="flex justify-center items-center flex-col">
          <h1>
            Welcome to <br />
            Smart watch Docker
          </h1>
        </div>
        <div className="flex gap-8">
          <div className="flex flex-col gap-8">
            <Link to="/">
              <div>
                <HomeButton name={"Home"} />
              </div>
            </Link>
            <Link to="/useit">
              <div>
                <HomeButton name={"Use !t"} />
              </div>
            </Link>
          </div>
          <div className="flex flex-col gap-8">
            <Link to="/knowUs">
              <div>
                <HomeButton name={"Know Us"} />
              </div>
            </Link>
            <Link to="/statistics">
              <div>
                <HomeButton name={"Stats"} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
