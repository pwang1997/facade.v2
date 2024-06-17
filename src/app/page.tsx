import HeroSection from "./_components/hero-section";
import ShareSpace from "./_components/share-space";
import WhereToFindMe from "./_components/where-to-find-me";


export default async function Home() {

  return (
    <div className='mx-1 pt-96 sm:pt-0 h-[calc(100dvh-64px)] grid place-content-center absolute sm:relative'>
      <div className="pt-96 sm:pt-0">
        <HeroSection />
      </div>
      <div>
        <ShareSpace />
      </div>
      <div>
        <WhereToFindMe />
      </div>
    </div>
  );
}