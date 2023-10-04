
export default function PermissionList({ permissions }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              id
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
              permission
            </th> */}
            <th scope="col" className="px-6 py-3">

            </th>
          </tr>
        </thead>
        <tbody>
          {permissions.data.map((permission, i) => {
            return (
              <tr className="bg-white border-b" key={i}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {permission.id}
                </th>
                <td className="px-6 py-4">
                  {permission.name}
                </td>
                <td className="px-6 py-4">
                  {permission.guard_name}
                </td>
                <td className="px-6 py-4">
                  {permission.created_at}
                </td>
                {/* <td className="px-6 py-4">
                  {user.permission.name}
                </td> */}
                <td className="px-6 py-4">
                  <a href={'/'} className="font-medium text-blue-600  hover:underline">Edit</a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}