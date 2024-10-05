
import Link from 'next/link';
import CloudArrowIcon from '~/icons/CloudArrowIcon';
import GitHubIcon from '~/icons/GitHubIcon';
import { GmailIcon } from '~/icons/GmailIcon';
import GraduationIcon from '~/icons/GraduationIcon';
import LinkedInIcon from '~/icons/LinkedInIcon';
import MapPinIcon from '~/icons/MapPinIcon';
import MediumIcon from '~/icons/MediumIcon';
import UserIcon from '~/icons/UserIcon';
import { MyParticles } from '../Particles';
import DownloadableFileItem from './_components/DownloadableFileItem';
import Timeline from './_components/Timeline';

export default async function AboutPage() {
  return (
    <div>
      <MyParticles />
      <div className='mt-6 border-t border-gray-100'>
        <dl className='divide-y divide-gray-100'>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 animate-[fadeIn_2s_ease-in-out]'>
            <dt className='flex gap-1 text-sm font-medium leading-6 text-dark dark:bg-medium dark:text-white'>
              <UserIcon />
              <div id="myself">
                <a href="#myself">About Myself</a>
              </div>
            </dt>
            <dd className='mt-1 text-sm font-normal leading-6 text-gray-700 sm:col-span-2 sm:mt-0 dark:bg-medium dark:text-white'>
              I am a software engineer who loves to build and experience novel technologies. My tech stack mainly falls
              under the Java & Spring domain. My work and projects primarily involve Spring Boot, Docker, Redis, MySQL,
              and Message Queues (Kafka / RabbitMQ). Instead of being a pure backend engineer, I find being a full-stack
              engineer brings me more excitement and vitality. <br />I am currently based in Ottawa, Canada. Before
              moving to Ottawa, I acquired an Honours Bachelor of Computer Science at the University of British
              Columbia, Kelowna Campus. My thesis focused on engineering an audience response system for student labs
              and class activities.
            </dd>
          </div>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='flex gap-1 text-sm font-medium leading-6 text-gray-900 dark:bg-medium dark:text-white animate-[fadeIn_2s_ease-in-out]'>
              <GraduationIcon />
              <div id="experience">
                <a href="#experience">Education & Career Path</a>
              </div>
            </dt>
            <dd className='mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0'>
              <Timeline />
            </dd>
          </div>
          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
            <dt className='flex gap-1 text-sm font-medium leading-6 text-gray-900 dark:bg-medium dark:text-white'>
              <MapPinIcon />
              <div id="contact">
                <a href="#contact">Find Me</a>
              </div>
            </dt>
            <dd className='flex gap-4'>
              <Link className='hover:bg-white-hover dark:bg-dark dark:text-white dark:hover:bg-dark-hover rounded-lg p-2'
                href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'pwang1997'}`}>
                <GitHubIcon />
              </Link>
              <Link className="hover:bg-white-hover dark:bg-dark dark:text-white dark:hover:bg-dark-hover rounded-lg p-2"
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_TO ?? 'wzlpuck@gmail.com'}`}>
                <GmailIcon />
              </Link>
              <Link className="hover:bg-white-hover dark:bg-dark dark:text-white dark:hover:bg-dark-hover rounded-lg p-2"
                href={`https://medium.com/${process.env.NEXT_PUBLIC_MEDIUM_USERNAME ?? '@zhengliang_puck_wang'} `}>
                <MediumIcon />
              </Link>

              <Link className="hover:bg-white-hover dark:bg-dark dark:text-white dark:hover:bg-dark-hover rounded-lg p-2"
                href={`https://www.linkedin.com/in/${process.env.NEXT_PUBLIC_LINKEDIN_USERNAME ?? 'puck-wang-2020'}/`}>
                <LinkedInIcon />
              </Link>
            </dd>
          </div>

          <div className='px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 animate-[fadeIn_5s_ease-in-out]'>
            <dt className='flex gap-1 text-sm font-medium leading-6 text-gray-900 dark:bg-medium dark:text-white'>
              <CloudArrowIcon />
              <div id="resume">
                <a href="#resume">Attachments</a>
              </div>
            </dt>
            <dd className='mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
              <ul className='divide-y divide-gray-100 rounded-md border border-gray-200'>
                <DownloadableFileItem
                  name='ZhengliangWang-SDE-Resume.pdf'
                  href='/resume/ZhengliangWang-SDE-Resume.pdf'
                  size='174KB'
                />
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
