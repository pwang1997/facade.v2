import HeroSection from "../_components/hero-section";
import ShareSpace from "../_components/share-space";
import WhereToFindMe from "../_components/where-to-find-me";

export default async function Home() {

  return (
    <main>
      <div className='mx-1 sm:pt-0 grid gap-y-8 place-content-center'>
        <div className="sm:pt-0">
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