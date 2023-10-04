import { Link } from '@inertiajs/react';
import React from 'react';
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

export default function Pagination({ links }) {

  function getClassName(active) {
    if (active) {
      return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary bg-blue-700 text-white";
    } else {
      return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-primary focus:text-primary";
    }
  }

  return (
    links.length > 3 && (
      <div className="">
        <div className="flex flex-wrap">
          {links.map((link, i) => (
            link.url === null ? // if
              (
                <div
                  key={i}
                  className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded"
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