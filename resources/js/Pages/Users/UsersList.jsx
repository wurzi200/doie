
export default function UsersList({ users }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              firstname
            </th>
            <th scope="col" className="px-6 py-3">
              lastname
            </th>
            <th scope="col" className="px-6 py-3">
              email
            </th>
            <th scope="col" className="px-6 py-3">
              organization
            </th>
            <th scope="col" className="px-6 py-3">
              role
            </th>
            <th scope="col" className="px-6 py-3">
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            return (
              <tr className="bg-white border-b" key={i}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {user.name}
                </th>
                <td className="px-6 py-4">
                  {user.lastname}
                </td>
                <td className="px-6 py-4">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  {user.organization && user.organization.name}
                </td>
                <td className="px-6 py-4">
                  {user.roles[0] && user.roles[0].name}
                </td>
                <td className="px-6 py-4">
                  <a href={route('user.edit', user.id)} className="font-medium text-blue-600  hover:underline">Edit</a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}