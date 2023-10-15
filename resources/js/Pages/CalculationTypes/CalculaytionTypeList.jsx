import { backgroundSecondary, backgroundTertiary, border, textMain, textSecondary } from "@/constants";
import { BiEditAlt, BiTrash } from "react-icons/bi";

export default function CalculationTypeList({ auth, calculationTypes }) {

  return (
    <div className={`${border} relative border overflow-x-auto shadow-md sm:rounded-lg mt-4`}>
      <table className={`w-full text-md text-left`}>
        <thead className={`${backgroundTertiary} ${textMain} text-sm uppercase`}>
          <tr>
            <th scope={`col`} className={`px-6 py-3`}>
              Name
            </th>
            {/* <th scope={`col`} className={`px-6 py-3`}>
              Type test
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
              Min Cost
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
              Max Cost
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
              Min Special
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
              Max Special
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
              Min Residual
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
              Max Residual
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
              Min Interest
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
              Max Interest
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
              Min Duration
            </th>
            <th scope={`col`} className={`px-6 py-3`}>
              Max Duration
            </th> */}
            <th scope={`col`} className={`px-6 py-3`}>
            </th>
          </tr>
        </thead>
        <tbody>
          {calculationTypes.data.map((calculationType, i) => {
            return (
              <tr className={`${backgroundSecondary} ${border} ${textSecondary} border-b`} key={i}>
                <th scope={`row`} className={`${textMain} px-6 py-4 whitespace-nowrap`}>
                  {calculationType.name}
                </th>
                {/* <td className={`px-6 py-4`}>
                  {calculationType.type}
                </td>
                <td className={`px-6 py-4`}>
                  {calculationType.minCost} €
                </td>
                <td className={`px-6 py-4`}>
                  {calculationType.maxCost} €
                </td>
                <td className={`px-6 py-4`}>
                  {calculationType.minSpecial} €
                </td>
                <td className={`px-6 py-4`}>
                  {calculationType.maxSpecial} €
                </td>
                <td className={`px-6 py-4`}>
                  {calculationType.minResidual} €
                </td>
                <td className={`px-6 py-4`}>
                  {calculationType.maxResidual} €
                </td>
                <td className={`px-6 py-4`}>
                  {calculationType.minInterest} %
                </td>
                <td className={`px-6 py-4`}>
                  {calculationType.maxInterest} %
                </td>
                <td className={`px-6 py-4`}>
                  {calculationType.minDuration}
                </td>
                <td className={`px-6 py-4`}>
                  {calculationType.maxDuration}
                </td> */}
                <td className={`px-6 py-4 flex justify-end`}>
                  {auth.permissions.find((permission => permission.name === 'edit_calculation_types')) &&
                    <a href={route('calculationType.edit', calculationType.id)} className="mr-4">
                      <BiEditAlt className={`${textSecondary} text-2xl`} />
                    </a>
                  }
                  {auth.permissions.find((permission => permission.name === 'delete_calculation_types')) &&
                    <a href={route('calculationType.destroy', calculationType.id)}>
                      <BiTrash className={`${textSecondary} text-2xl`} />
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