import { Paperclip } from 'lucide-react';

interface DownloadableFileItemProp {
  name: string;
  href: string;
  size?: string;
}
export default function DownloadableFileItem({ name, size, href }: DownloadableFileItemProp) {
  return (
    <li className='flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6'>
      <div className='flex w-0 flex-1 items-center'>
        <Paperclip className='h-5 w-5 flex-shrink-0 text-gray-400' aria-hidden='true' />
        <div className='ml-4 flex min-w-0 flex-1 gap-2'>
          <span className='truncate font-medium dark:bg-medium dark:text-white'>{name}</span>
          <span className='flex-shrink-0 text-gray-400'>{size}</span>
        </div>
      </div>
      <div className='ml-4 flex-shrink-0'>
        <a href={href} className='font-medium text-indigo-600 hover:text-indigo-500 dark:bg-medium dark:text-white'>
          Download
        </a>
      </div>
    </li>
  );
}
