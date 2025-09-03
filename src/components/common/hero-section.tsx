import Image, { StaticImageData } from "next/image";

const HeroSection = ({
  title = "",
  badge = "",
  description = "",
  image,
}: {
  title: string;
  badge: string;
  description: string;
  image: StaticImageData;
}) => {
  return (
    <div className="">
      <div className="grid lg:grid-cols-12 col-span-4 container">
        <div className="lg:col-span-4 col-span-0" />
        <div className="lg:pt-45 pt-20 lg:col-span-5 col-end-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-brand" />
              <p className="text-xs lg:text-base">{badge}</p>
            </div>
            <div>
              <h2 className="lg:text-7xl text-3xl font-medium">{title}</h2>
            </div>
            <div className="text-weak text-base text-justify">
              <p>{description}</p>
            </div>
          </div>
          <div className="col-span-3" />
        </div>
      </div>

      <div className="lg:pt-21 pt-5">
        {/* <Image src={image} alt={title} className="object-cover h-full w-full" /> */}
      </div>
    </div>
  );
};

export default HeroSection;
