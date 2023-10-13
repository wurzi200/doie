import { BiEdit, BiEditAlt, BiTrash } from "react-icons/bi";
import { backgroundSecondary, textMain, border, backgroundTertiary, textSecondary } from "@/constants";

export default function OrganizationsList({ auth, organizations }) {
  return (
    <div className={`${border} relative border overflow-x-auto shadow-md sm:rounded-lg mt-4`}>
      <table className={`w-full text-sm text-left ${textMain}`}>
        <thead className={`text-sm uppercase ${backgroundTertiary} ${border}`}>
          <tr>
            <th scope="col" className="px-6 py-3">
              organization
            </th>
            <th scope="col" className="px-6 py-3">

            </th>
          </tr>
        </thead>
        <tbody>
          {organizations.data.map((organization, i) => {
            return (
              <tr className={`${backgroundSecondary} ${border} border-b`} key={i}>
                <th scope="row" className={`px-6 py-4 font-medium ${textMain} whitespace-nowrap `}>
                  {organization.name}
                </th>
                <td className="px-6 py-4 flex justify-around">
                  {auth.permissions.find((permission => permission.name === 'edit_organizations')) &&
                    <a href={route('organization.edit', organization.id)} className="hover:underline">
                      <BiEditAlt className={`text-2xl ${textSecondary}`} />
                    </a>
                  }
                  {auth.user.roles.find((role => role.name === 'super-admin-1')) &&
                    <a href={route('organization.delete', organization.id)} className="hover:underline">
                      <BiTrash className={`text-2xl ${textSecondary}`} />
                    </a>
                  }
                </td>
              </tr>
            )
          }

          )}
        </tbody>
      </table>
    </div>
  )
}