import Image from "next/image";
import React from "react";

function Home() {
  return (
    <main className="h-screen">
      <div className="flex ml-12">
        <Image src="/isoleringslandslagetHeader.jpg" width={400} height={200} />
      </div>
      <div className="flex flex-col p-12 ml-12">
        <h1>Välkommen</h1>
        <p>
          Här kan du lägga till användare redigera kontakter och nyheter, klicka
          på dom olika ikonerna i menyn till vänster och se vad som händer!
        </p>
      </div>
    </main>
  );
}

export default Home;
