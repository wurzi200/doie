import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import UsersList from "./OrganizationsList";
import OrganizationsList from "./OrganizationsList";
import Pagination from "@/Components/Pagination";
import { BiPlus } from "react-icons/bi";
import Search from "@/Components/Search";
import { backgroundSecondary, border, textMain } from "@/constants";

export default function OrganizationsListView({ auth, organizations }) {

  return (
    <AuthenticatedLayout
      auth={auth}
      user={auth.user}
      header={<h2 className={`font-semibold text-xl leading-tight ${textMain}`}>Organizations</h2>}
    >
      <Head title="All ToDos" />

      <div className="py-12">
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className={`${backgroundSecondary} ${border} border overflow-hidden shadow-sm sm:rounded-lg flex`}>
            <div className={`p-6 ${textMain}`}>Organizations</div>
            {auth.user.roles.find((role => role.name === 'super-admin-1')) && <Search />}
            <div className="m-auto mr-4">
              {auth.user.roles.find((role => role.name === 'super-admin-1')) &&
                <a href={route('organization.create')} className="">
                  <BiPlus className={`text-3xl ${textMain}`}>+</BiPlus>
                </a>
              }
            </div>
          </div>
          {organizations &&
            <>
              <Pagination class={`mt-6`} links={organizations.links} />
              <OrganizationsList auth={auth} organizations={organizations}></OrganizationsList>
              <Pagination class={`mt-6`} links={organizations.links} />
            </>
          }

        </div>
      </div>

    </AuthenticatedLayout>
  );
}