
export default function OrganizationsList({ organizations }) {
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
          {organizations.map((organization, i) => {
            return (
              <tr className="bg-white border-b" key={i}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {organization.name}
                </th>
                <td className="px-6 py-4">
                  <a href="#" className="font-medium text-blue-600  hover:underline">Edit</a>
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