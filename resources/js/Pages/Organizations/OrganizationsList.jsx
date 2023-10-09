import { BiEdit, BiEditAlt, BiTrash } from "react-icons/bi"

export default function OrganizationsList({ auth, organizations }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
              <tr className="bg-white border-b" key={i}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {organization.name}
                </th>
                <td className="px-6 py-4 flex justify-around">
                  {auth.permissions.find((permission => permission.name === 'edit_organizations')) &&
                    <a href={route('organization.edit', organization.id)} className="hover:underline">
                      <BiEditAlt className="text-gray-600 text-xl" />
                    </a>
                  }
                  {auth.user.roles.find((role => role.name === 'super-admin-1')) &&
                    <a href={route('organization.delete', organization.id)} className="hover:underline">
                      <BiTrash className="text-gray-600 text-xl" />
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