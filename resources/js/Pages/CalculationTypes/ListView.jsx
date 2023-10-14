import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useRemember } from "@inertiajs/react";
import CalculationTypeList from "./CalcuLaytionTypeList";
import { BiUserPlus } from "react-icons/bi";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import axios from "axios";
import Search from "@/Components/Search";
import { backgroundSecondary, border, textMain } from "@/constants";


export default function CalculationTypesView({ auth, calculationTypes }) {

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
    >
      <Head title="Calculation Types" />

      <div className={`py-12`}>
        <div className={`mx-auto sm:px-6 lg:px-8`}>
          <div className={`${backgroundSecondary} ${border} ${textMain} border overflow-hidden shadow-sm sm:rounded-lg flex`}>
            <div className={`${textMain} p-6`}>Calculation Types</div>
            <Search />
            <div className={`m-auto mr-4`}>
              {auth.permissions.find((permission => permission.name === 'create_calculation_types')) &&
                <a href={route('calculationType.create')} className={`text-gray-600`}>
                  <BiUserPlus className={`${textMain} text-3xl`}>+</BiUserPlus>
                </a>
              }
            </div>
          </div>
          {calculationTypes &&
            <>
              <Pagination className={`mt-6`} links={calculationTypes.links} />
              <CalculationTypeList auth={auth} calculationTypes={calculationTypes}></CalculationTypeList>
              <Pagination className={`mt-6`} links={calculationTypes.links} />
            </>
          }
        </div>
      </div>

    </AuthenticatedLayout >
  );
}