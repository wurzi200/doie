import React, { useState } from 'react';
import { backgroundMain, backgroundSecondary, backgroundTertiary, border, textMain, textSecondary } from "@/constants";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { HiPrinter } from 'react-icons/hi';

export default function List({ auth, data, fields, editRoute, deleteRoute, printRoute, permission_name }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  function deleteItem(item) {
    setDeleteItemId(item.id);
    setShowDeleteModal(true);
  }

  function confirmDelete() {
    if (deleteItemId) {
      setDeleteItemId(null);
      setShowDeleteModal(false);
    }
  }

  function cancelDelete() {
    setDeleteItemId(null);
    setShowDeleteModal(false);
  }

  function editItem(item) {
    route(editRoute, { id: item.id });
  }

  return (
    <div className={`${border} relative border overflow-x-auto shadow-md sm:rounded-lg mt-4`}>

      <table className={`w-full text-md text-left`}>
        <thead className={`${backgroundTertiary} ${textMain} text-sm uppercase`}>
          <tr>
            {fields.map(field => (
              <th key={field.name || field} scope={`col`} className={`px-6 py-3`}>{field.label || field}</th>
            ))}
            {deleteRoute || editRoute ?
              <th></th> : ''
            }
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id} className={`${backgroundSecondary} ${border} ${textSecondary} border-b`}>
              {fields.map(field => {
                const value = field.name.split('.').reduce((obj, key) => {
                  if (obj) {
                    if (key.includes('[')) {
                      const [arrayKey, indexKey] = key.split(/[\[\]]+/);
                      const array = obj[arrayKey];
                      if (array) {
                        const index = parseInt(indexKey);
                        return array[index];
                      }
                    } else {
                      if (field.type === 'currency') {
                        return obj[key] / 100 + ' €';
                      }
                      if (field.type === 'percent') {
                        return obj[key] + ' %';
                      }
                      if (field.type === 'link') {
                        return <a className='text-blue-600' href={`${obj[key]}`} target="_blank" rel="noopener noreferrer">
                          {obj[key]}</a>
                      }
                      return obj[key];
                    }

                  }
                  return '';
                }, item); return (
                  <td key={field.name || field} className={`px-6 py-4`}>
                    {
                      value
                    }
                  </td>
                );
              })}
              <td className={`px-6 py-4 text-right flex justify-end`}>
                {editRoute && auth.permissions.find((permission => permission.name === `edit_${permission_name}`)) &&
                  <a href={route(editRoute, { id: item.id })} className={`text-2xl text-blue-500 hover:text-blue-700 mr-4`}>
                    <BiEditAlt />
                  </a>
                }
                {deleteRoute && auth.permissions.find((permission => permission.name === `delete_${permission_name}`)) &&
                  <button onClick={() => deleteItem(item)} className={`text-2xl text-red-500 hover:text-red-700 mr-4`}>
                    <BiTrash />
                  </button>
                }
                {printRoute && auth.permissions.find((permission => permission.name === `print_${permission_name}`)) &&
                  <a href={route(printRoute, { id: item.id })} className={`text-2xl text-indigo-500 hover:text-indigo-700 mr-4`}>
                    <HiPrinter />
                  </a>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDeleteModal &&
        <div className={`fixed z-10 inset-0 overflow-y-auto`}>
          <div className={`flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0`}>
            <div className={`fixed inset-0 transition-opacity`} aria-hidden={`true`}>
              <div className={`absolute inset-0 ${backgroundMain} opacity-75`}></div>
            </div>

            <span className={`hidden sm:inline-block sm:align-middle sm:h-screen`} aria-hidden={`true`}></span>

            <div className={`inline-block align-bottom ${backgroundSecondary} rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full`} role={`dialog`} aria-modal={`true`} aria-labelledby={`modal-headline`}>
              <div className={` px-4 pt-5 pb-4 sm:p-6 sm:pb-4`}>
                <div className={`sm:flex sm:items-start`}>
                  <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10`}>
                    <BiTrash className={`h-6 w-6 text-red-600`} />
                  </div>
                  <div className={`mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left`}>
                    <h3 className={`text-lg leading-6 font-medium ${textMain}`} id={`modal-headline`}>
                      Delete item
                    </h3>
                    <div className={`mt-2`}>
                      <p className={`text-sm ${textSecondary}`}>
                        Are you sure you want to delete this item? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${backgroundTertiary} px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse`}>
                <a onClick={confirmDelete} href={route(deleteRoute, { id: deleteItemId })} className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm`}>
                  Delete
                </a>
                <button onClick={cancelDelete} className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 text-base font-medium ${textMain} hover:${backgroundTertiary} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </div >
  );
}