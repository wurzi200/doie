
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import UsersList from "./OrganizationsList";
import OrganizationsList from "./OrganizationsList";
import Pagination from "@/Components/Pagination";
import { BiPlus } from "react-icons/bi";

export default function OrganizationsListView({ auth, organizations }) {

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={< h2 className="font-semibold text-xl text-gray-800 leading-tight" > Organizations</h2 >}
    >
      <Head title="All ToDos" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex">
            <div className="p-6 text-gray-900 w-full">Organizations</div>
            <div className="m-auto mr-4">
              <a href={route('organization.create')} className="">
                <BiPlus className="text-3xl text-gray-600">+</BiPlus>
              </a>
            </div>
          </div>
          {organizations &&
            <>
              <Pagination class="mt-6" links={organizations.links} />
              <OrganizationsList organizations={organizations}></OrganizationsList>
              <Pagination class="mt-6" links={organizations.links} />
            </>
          }

        </div>
      </div>

    </AuthenticatedLayout >
  );
}