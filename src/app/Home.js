import React from "react";
import { HeaderImage } from "./HeaderImage";
function Home(props) {
  return (
    <main className="h-screen">
      <HeaderImage />
      <div className="flex flex-row p-4 ml-20 gap-3">
        <h1>Välkommen</h1> 
        <p>{props.user.displayName}</p>
        </div>
        <div className="p-4 ml-20">
        <p>
          Här kan du lägga till användare redigera kontakter och nyheter, klicka
          på dom olika ikonerna i menyn till vänster och se vad som händer!
        </p>
      </div>
    </main>
  );
}

export default Home;
