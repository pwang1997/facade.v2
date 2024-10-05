import { MyParticles } from "../Particles";
import notes from "./site-notes";

export default function Page() {
  return (
    <>
      <MyParticles />
      <div className="dark:bg-medium dark:text-white">
        <div className='max-w-md divide-y divide-gray-200 text-gray-900 dark:divide-gray-700 dark:text-white min-w-full py-6'>
          {
            notes.map((item: { date: string, text: string }) => {
              return (
                <div key={item.date} className='flex flex-col pb-3'>
                  <dt className='mb-1 text-gray-500 md:text-lg dark:text-gray-400'>{item.date}</dt>
                  <dd className='text-lg font-semibold'>{item.text}</dd>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  );
}
