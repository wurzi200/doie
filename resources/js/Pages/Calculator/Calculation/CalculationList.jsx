import { backgroundSecondary, backgroundTertiary, border, textMain, textSecondary } from "@/constants";
import { BiEditAlt, BiPrinter, BiTrash } from "react-icons/bi";

export default function CalculationList({ auth, calculations }) {

  return (
    <div className={`${border} relative border shadow-md sm:rounded-lg mt-4 overflow-x-auto`}>
      <table className={`w-full text-md text-left`}>
        <thead className={`${backgroundTertiary} ${textMain} text-sm uppercase`}>
          <tr>
            <th scope={`col`} className={`px-6 py-3`}>
              ID
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
              Cost
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
              Duration
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
              Special
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
              Residual
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
              Interest
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
              Created At
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
              User
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
            </th>
          </tr>
        </thead>
        <tbody>
          {calculations.data.map((calculation, i) => {
            return (
              <tr className={`${backgroundSecondary} ${border} ${textSecondary} border-b`} key={i}>
                <th scope={`row`} className={`${textMain} px-6 py-4 whitespace-nowrap`}>
                  {calculation.name}
                </th>
                <td className={`px-6 py-4`}>
                  {calculation.cost / 100} €
                </td>
                <td className={`px-6 py-4`}>
                  {calculation.duration}
                </td>
                <td className={`px-6 py-4`}>
                  {calculation.special / 100} €
                </td>
                <td className={`px-6 py-4`}>
                  {calculation.residual / 100} €
                </td>
                <td className={`px-6 py-4`}>
                  {calculation.interest} %
                </td>
                <td className={`px-6 py-4`}>
                  {calculation.created_at}
                </td>
                <td className={`px-6 py-4`}>
                  {calculation.user.name}
                </td>
                <td className={`px-6 py-4 justify-end flex`}>
                  {auth.permissions.find((permission => permission.name === 'edit_calculations')) &&
                    <a href={route('calculation.edit', calculation.id)}>
                      <BiEditAlt className={`${textSecondary} text-2xl`} />
                    </a>
                  }
                  {auth.permissions.find((permission => permission.name === 'delete_calculations')) &&
                    <a href={route('calculation.destroy', calculation.id)}>
                      <BiTrash className={`${textSecondary} text-2xl`} />
                    </a>
                  }
                  {auth.permissions.find((permission => permission.name === 'print_calculations')) &&
                    <a href={route('calculation.print', calculation.id)}>
                      <BiPrinter className={`${textSecondary} text-2xl`} />
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