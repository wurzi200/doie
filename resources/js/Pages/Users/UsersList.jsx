import { backgroundSecondary, backgroundTertiary, border, textMain, textSecondary } from "@/constants";
import { BiEditAlt } from "react-icons/bi";
export default function UsersList({ auth, users }) {

  return (
    <div className={`${border} relative border overflow-x-auto shadow-md sm:rounded-lg mt-4`}>
      <table className={`w-full text-md text-left`}>
        <thead className={`${backgroundTertiary} ${textMain} text-sm uppercase`}>
          <tr>
            <th scope={`col`} className={`px-6 py-3`}>
              firstname
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
              lastname
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
              email
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
              organization
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
              role
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.data.map((user, i) => {
            return (
              <tr className={`${backgroundSecondary} ${border} ${textSecondary} border-b`} key={i}>
                <th scope={`row`} className={`${textMain} px-6 py-4 whitespace-nowrap`}>
                  {user.name}
                </th>
                <td className={`px-6 py-4`}>
                  {user.lastname}
                </td>
                <td className={`px-6 py-4`}>
                  {user.email}
                </td>
                <td className={`px-6 py-4`}>
                  {user.organization && user.organization.name}
                </td>
                <td className={`px-6 py-4`}>
                  {user.roles[0] && user.roles[0].display_name}
                </td>
                <td className={`px-6 py-4`}>
                  {auth.permissions.find((permission => permission.name === 'edit_users')) &&
                    <a href={route('user.edit', user.id)} className={`hover:underline`}>
                      <BiEditAlt className={`${textSecondary} text-2xl`} />
                    </a>
                  }
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div >
  )
}