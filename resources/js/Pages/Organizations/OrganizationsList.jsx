
export default function OrganizationsList({ organizations }) {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
      <table class="w-full text-sm text-left text-gray-500 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">
              organization
            </th>
            <th scope="col" class="px-6 py-3">

            </th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((organization) => {
            return (
              <tr class="bg-white border-b ">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {organization.name}
                </th>
                <td class="px-6 py-4">
                  <a href="#" class="font-medium text-blue-600  hover:underline">Edit</a>
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