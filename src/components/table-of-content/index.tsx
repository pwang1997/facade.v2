// components/TableOfContents.js
"use client";

import { useEffect, useState } from 'react';

const TableOfContents = ({ headings } : {headings : {level : number, title : string, id : string}[]}) => {
  const [activeId, setActiveId] = useState();

  useEffect(() => {
    const handleScroll = () => {
      let currentId;
      headings.forEach(heading => {
        const element = document.getElementById(heading.id);
        if (element && element.getBoundingClientRect().top <= 50) {
          currentId = heading.id;
        }
      });
      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  return (
    <ul>
      {headings.map(heading => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            className={activeId === heading.id ? 'text-blue-500' : ''}
          >
            {heading.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default TableOfContents;
