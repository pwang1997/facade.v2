import HeroSection from "./_components/hero-section";
import ShareSpace from "./_components/share-space";
import TopNav from "./_components/top-nav";
import WhereToFindMe from "./_components/where-to-find-me";


export default async function Home() {

  return (
    <main>
      <TopNav />
      <div className='mx-1 pt-96 sm:pt-0 h-[calc(100dvh-64px)] grid gap-y-8 place-content-center absolute sm:relative'>
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
    </main>

  );
}