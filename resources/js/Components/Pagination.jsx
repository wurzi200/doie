import { backgroundMain, backgroundSecondary, border, textMain } from '@/constants';
import { Link } from '@inertiajs/react';
import React from 'react';

export default function Pagination({ links }) {

  function getClassName(active) {
    if (active) {
      return `mr-1 mb-1 px-4 py-3 text-sm leading-4 border dark:border-gray-400 rounded dark:hover:bg-gray-400 hover:bg-white focus:border-primary focus:text-primary bg-blue-700 text-white`;
    } else {
      return `${border} mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded dark:hover:bg-gray-400 hover:bg-white focus:border-primary focus:text-primary`;
    }
  }

  return (
    links.length > 3 && (
      <div className={`${backgroundSecondary} ${border} ${textMain} border mt-4 mb-4 p-4 sm:rounded-lg`}>
        <div className={`flex flex-wrap`}>
          {links.map((link, i) => (
            link.url === null ? // if
              (
                <div
                  key={i}
                  className={`${border} mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded`}
                >
                  {link.label.replace('&laquo;', '').replace('&raquo;', '')}
                </div>
              )
              : //else
              (
                <Link
                  key={i}
                  className={getClassName(link.active)}
                  href={link.url}
                >{link.label.replace('&laquo;', '').replace('&raquo;', '')}</Link>
              )
          ))}
        </div>
      </div>
    )
  );
}