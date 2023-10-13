import { router } from "@inertiajs/react";
import { useState } from "react";
import { backgroundSecondary, backgroundTertiary, border, textMain, textSecondary } from '@/Constants';

export default function UpdateRolePermissionForm({ role, permissions }) {

  function togglePermission(permission, value) {


    const data = {
      role: role.id,
      permission: permission.name,
      value: value
    }

    axios.post('/togglePermission', data)
      .then(
        router.reload(),
      )
      .catch(error => {
        console.log("ERROR:: ", error.response.data);
      });
  }

  return (
    <div className={`${backgroundSecondary} ${border} border relative overflow-x-auto shadow-md sm:rounded-lg mt-4`}>
      <table className={`w-full text-sm text-left ${textSecondary}`}>
        <thead className={`text-sm ${textMain} uppercase ${backgroundTertiary}`}>
          <tr>
            <th scope="col" className={`px-6 py-3`}>
              name
            </th>
            <th scope="col" className={`px-6 py-3`}>

            </th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission, i) => {
            return (
              <tr className={`${backgroundSecondary} ${border} border-b`} key={i}>
                <td className={`${textMain} px-6 py-4`}>
                  {permission.name}
                </td>
                <td className={`px-6 py-4 flex justify-around`}>
                  <button
                    onClick={() => togglePermission(permission)}
                    className={`border-black w-4 h-4`}
                  >
                  </button>
                  <label className={`relative inline-flex items-center cursor-pointer`}>
                    <input
                      type="checkbox"
                      value={''}
                      className={`sr-only peer`}
                      defaultChecked={role.permissions.some(perm => perm.name === permission.name)}
                      onChange={() => togglePermission(permission, role.permissions.some(perm => perm.name === permission.name))}
                    />
                    <div
                      className={`w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600`}
                    />
                  </label>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}