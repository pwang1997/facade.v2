export default function Timeline() {
  const timeLineItemClass = "mb-10 ms-4  animate-fadeIn"
  return (
    <ol className='relative border-s border-gray-200 dark:border-gray-700'>
      <li className={`${timeLineItemClass}`}
      style={{ animationDelay: "200ms"}}>
        <div className='absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700' />
        <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
          January 2023 - December 2023
        </time>
        <h3 className='flex justify-between text-lg font-semibold text-gray-900 dark:text-white'>
          <span>Full-Stack Software Engineer Intern</span>
          <span>Solace Systems Inc.</span>
        </h3>
        <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
          Collaborated and developed Message Queue Management System in Solace Cloud Platform with Spring Boot and React.
        </p>
        <ul className=' list-inside list-disc space-y-1 text-gray-500 dark:text-gray-400'>
          <li>
            Designed and implemented the visualization of the messaging queue configuration relation in Java and MySQL.{' '}
          </li>
          <li>Accelerated development cycles by contributing to the internal React component library with TypeScript and MUI.</li>
          <li>Automated log analysis on error level logs, which significantly reduced the cost on DataDog. </li>
          <li>Optimized the level of SQL execution of 10,000+ rows to millisecond.</li>
          <li>
            Reduced the micro-frontend rendering overhead by 20% by applying Recoil state management and React Query.
          </li>
          <li>Conducted MySQL update and migrations for multiple microservices </li>
        </ul>
      </li>
      <li className={`${timeLineItemClass}`}
      style={{ animationDelay: "400ms"}}>
        <div className='absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700' />
        <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
          April 2023 - June 2023
        </time>
        <h3 className='flex justify-between text-lg font-semibold text-gray-900 dark:text-white'>
          <span>Web Developer</span>
          <span>Univeristy of Ottawa</span>
        </h3>
        <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
          Architected and developed a modular monolithic full-stack academic platform using React, Node.js, Redis and MySQL.
        </p>
        <ul className=' list-inside list-disc space-y-1 text-gray-500 dark:text-gray-400'>
          <li>Led a team of students to launch two major releases following Agile methodology and Test-Driven Development.</li>
          <li>Built token bucket rate limiting mechanism and IP block list with Node.js and Redis. </li>
          <li>Designed and implemented custom API gateways along with nginx reverse poxy.</li>
          <li>Crafted integration tests and CI/CD pipelines with Circle CI and GitHub Actions.</li>
          <li>Secured system stability with JMeter stress testing, maintaining latency under 200ms in the 99th percentile.</li>
        </ul>
      </li>

      <li className={`${timeLineItemClass}`}
      style={{ animationDelay: "600ms"}}>
        <div className='absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700' />
        <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
          May 2022 - August 2022
        </time>
        <h3 className='flex justify-between text-lg font-semibold text-gray-900 dark:text-white'>
          <span>Software Developer intern</span>
          <span>Bank of Canada</span>
        </h3>
        <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
          Examined traditional machine learning models performance on forecasting Canadian, UK, US macroeconomic variables.
        </p>
        <ul className=' list-inside list-disc space-y-1 text-gray-500 dark:text-gray-400'>
          <li>Architected and developed time-series-based machine learning models and auto-tuning pipelines in Python and Keras.</li>
          <li>Implemented real-time macro-economy analysis dashboard with Plotly and Django.</li>
          <li>
            Studied the robustness of machine learning interpretation methods, such as Shapley value based SHAP approach and LIME.
          </li>
        </ul>
      </li>
      <li className={`${timeLineItemClass}`}
      style={{ animationDelay: "800ms"}}>
        <div className='absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700' />
        <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
          September 2021 - June 2023
        </time>
        <h3 className='flex justify-between text-lg font-semibold text-gray-900 dark:text-white'>
          <span>Master of Data Science</span>
          <span>University of Ottawa</span>
        </h3>
        <p className=" capitalize">Course work: Full-stack Cloud Computing, Distributed Database, Applied Data Science, Mobile Development, Natural Language Processing </p>
      </li>
      <li className={`${timeLineItemClass}`}
      style={{ animationDelay: "1000ms"}}>
        <div className='absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700' />
        <time className='mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500'>
          September 2018 - June 2020
        </time>
        <h3 className='flex justify-between text-lg font-semibold text-gray-900 dark:text-white'>
          <span>Bachelor of Science, Honours Program</span>
          <span>UBC, Kelowna Campus</span>
        </h3>
        <p className=" capitalize">Course work: Database Management System, Computer Networking, Artificial Intelligence, Machine Learning, Computer Vision,
          Analysis of Algorithms</p>
        <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
          Thesis: An audience response system for student labs and class activities.
        </p>
      </li>
    </ol>
  );
}
