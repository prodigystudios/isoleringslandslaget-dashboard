import Image from "next/image";
export const HeaderImage = () => {
  return (
    <div className="flex ml-12 bg-white">
      <Image
        src="/isoleringslandslagetHeader.jpg"
        width={400}
        height={200}
        alt="Header image"
      />
    </div>
  );
};
