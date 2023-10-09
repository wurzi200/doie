import { BiEdit, BiEditAlt, BiTrash, BiTrashAlt } from "react-icons/bi"

export default function RoleList({ auth, roles }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              id
            </th>
            <th scope="col" className="px-6 py-3">
              dispaly name
            </th>
            <th scope="col" className="px-6 py-3">
              name
            </th>
            <th scope="col" className="px-6 py-3">
              guard
            </th>
            <th scope="col" className="px-6 py-3">
              created
            </th>
            {/* <th scope="col" className="px-6 py-3">
              role
            </th> */}
            <th scope="col" className="px-6 py-3">
            </th>

          </tr>
        </thead>
        <tbody>
          {roles.data.map((role, i) => {
            return (
              <tr className="bg-white border-b" key={i}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {role.id}
                </th>
                <td className="px-6 py-4">
                  {role.display_name}
                </td>
                <td className="px-6 py-4">
                  {role.name}
                </td>
                <td className="px-6 py-4">
                  {role.guard_name}
                </td>
                <td className="px-6 py-4">
                  {role.created_at}
                </td>
                {/* <td className="px-6 py-4">
                  {user.role.name}
                </td> */}
                <td className="px-6 py-4 flex justify-around">
                  {auth.permissions.find((permission => permission.name === 'edit_roles')) &&
                    <>
                      <a href={route('role.edit', role.id)} className="hover:underline">
                        <BiEditAlt className="text-gray-600 text-xl" />
                      </a>
                      <a href={route('role.delete', role.id)} className="hover:underline">
                        <BiTrash className="text-gray-600 text-xl" />
                      </a>
                    </>
                  }
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}