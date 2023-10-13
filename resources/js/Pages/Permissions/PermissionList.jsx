import { BiTrash, BiTrashAlt } from "react-icons/bi";
import { backgroundSecondary, backgroundTertiary, border, textMain, textSecondary } from '@/Constants';

export default function PermissionList({ permissions }) {
  return (
    <div className={`relative overflow-x-auto shadow-md sm:rounded-lg mt-4 ${backgroundSecondary}`}>
      <table className={`w-full text-sm text-left ${textSecondary}`}>
        <thead className={`text-sm ${textMain} uppercase ${backgroundTertiary}`}>
          <tr>
            <th scope="col" className={`px-6 py-3`}>
              id
            </th>
            <th scope="col" className={`px-6 py-3`}>
              name
            </th>
            <th scope="col" className={`px-6 py-3`}>
              guard
            </th>
            <th scope="col" className={`px-6 py-3`}>
              created
            </th>
            {/* <th scope="col" className={`px-6 py-3`}>
              permission
            </th> */}
          </tr>
        </thead>
        <tbody>
          {permissions.data.map((permission, i) => {
            return (
              <tr className={`${textSecondary} ${backgroundSecondary} ${border} border-b`} key={i}>
                <th scope="row" className={`px-6 py-4 font-medium ${textMain} whitespace-nowrap `}>
                  {permission.id}
                </th>
                <td className={`px-6 py-4`}>
                  {permission.name}
                </td>
                <td className={`px-6 py-4`}>
                  {permission.guard_name}
                </td>
                <td className={`px-6 py-4`}>
                  {permission.created_at}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}