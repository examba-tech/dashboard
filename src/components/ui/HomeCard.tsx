import Link from "next/link";
import Image from "next/image";

const HomeCard = ({
  link,
  img_path,
  text,
}: {
  link: string;
  img_path: string;
  text: string;
}) => {
  return (
    <Link href={link}>
      <div
        className="option-box flex flex-col justify-center items-center bg-blue-100 p-4 text-black transition hover:bg-opacity-90 shadow-lg mr-4 cursor-pointer"
        style={{ height: "200px", width: "200px" }}
      >
        <div className="mb-1">
          <Image
            src={img_path}
            alt="Icon3"
            width={24}
            height={24}
            className="w-8 h-8 ml-5 mr-2 opacity-1"
          />
        </div>
        <p className="text-center text-xl font-bold">{text}</p>
      </div>
    </Link>
  );
};

export default HomeCard;
