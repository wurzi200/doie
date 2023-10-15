import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useRemember } from "@inertiajs/react";
import CalculationList from "./CalculationList";
import { BiPlus } from "react-icons/bi";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";
import axios from "axios";
import Search from "@/Components/Search";
import { backgroundSecondary, border, textMain, textSecondary } from "@/constants";


export default function CalculationListView({ auth, calculations }) {

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
    >
      <Head title="Calculations" />

      <div className={`py-12`}>
        <div className={`mx-auto sm:px-6 lg:px-8`}>
          <div className={`${backgroundSecondary} ${border} ${textMain} border overflow-hidden shadow-sm sm:rounded-lg flex`}>
            <div className={`${textMain} p-6`}>Calculations</div>
            <Search />
            <div className={`m-auto mr-4`}>
              {auth.permissions.find((permission => permission.name === 'create_calculations')) &&
                <a href={route('calculation.create')} className={`text-gray-600`}>
                  <BiPlus className={`${textMain} text-3xl`}>+</BiPlus>
                </a>
              }
            </div>
          </div>
          {calculations &&
            <>
              <Pagination className={`mt-6`} links={calculations.links} />
              <CalculationList auth={auth} calculations={calculations}></CalculationList>
              <Pagination className={`mt-6`} links={calculations.links} />
            </>
          }
        </div>
      </div>

    </AuthenticatedLayout >
  );
}