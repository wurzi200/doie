'use client';

import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards, HiLogout, HiCog, HiCalculator, HiOfficeBuilding } from 'react-icons/hi';
import { backgroundMain, backgroundSecondary, border, textMain } from '../constants';
import { Link } from '@inertiajs/react';

export default function Sidenav({ auth, user }) {

  const theme = {
    "root": {
      "base": `${backgroundSecondary + border} border-r px-2 py-2.5  sm:px-4 h-full`,
      "rounded": {
        "on": "rounded",
        "off": ""
      },
      "bordered": {
        "on": "border",
        "off": ""
      },
      "inner": {
        "base": "mx-auto flex flex-wrap items-center justify-between",
        "fluid": {
          "on": "",
          "off": "container"
        }
      }
    },
    "brand": {
      "base": "flex items-center"
    },
    "collapse": {
      "base": "w-full md:block md:w-auto",
      "list": "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
      "hidden": {
        "on": "hidden",
        "off": ""
      }
    },
    "link": {
      "base": "block py-2 pr-4 pl-3 md:p-0",
      "active": {
        "on": "bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-cyan-700",
        "off": "border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
      },
      "disabled": {
        "on": "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
        "off": ""
      }
    },
    "toggle": {
      "base": "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
      "icon": "h-6 w-6 shrink-0"
    }
  }

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example" theme={theme}>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            icon={HiViewBoards}
            href={route('dashboard')} active={route().current('dashboard')}
          >
            Dashboard
          </Sidebar.Item>
          {auth.permissions.find((permission => permission.name === 'create_calculations')) &&
            <Sidebar.Item
              href={route('calculation.create')} active={route().current('calulation')}
              icon={HiCalculator}
            >
              <p>
                Calculator
              </p>
            </Sidebar.Item>
          }
          {auth.permissions.find((permission => permission.name === 'show_calculations')) &&

            <Sidebar.Item
              href={route('calculations.index')} active={route().current('calculations.*')}
              icon={HiCalculator}
            >
              <p>
                Calculations
              </p>
            </Sidebar.Item>
          }
          <Sidebar.Item
            href="#"
            icon={HiOfficeBuilding}
          >
            <p>
              Objects
            </p>
          </Sidebar.Item>
          <hr />
          <Sidebar.Collapse
            icon={HiCog}
            label="Settings"
            open={route().current('users.*') ||
              route().current('user.*') ||
              route().current('organizations.*') ||
              route().current('roles.*') ||
              route().current('role.*') ||
              route().current('calculationTypes.*')
            }
          >
            {auth.permissions.find((permission => permission.name === 'show_users')) &&
              <Sidebar.Item href={route('users.index')} active={route().current('users.*') || route().current('user.*')}>
                Users
              </Sidebar.Item>
            }
            {auth.permissions.find((permission => permission.name === 'show_organizations')) &&
              <Sidebar.Item href={route('organizations.index')} active={route().current('organizations.*')}>
                Organization
              </Sidebar.Item>
            }
            {auth.permissions.find((permission => permission.name === 'show_roles')) &&
              <Sidebar.Item href={route('roles.index')} active={route().current('roles.*') || route().current('role.*')}>
                Roles
              </Sidebar.Item>
            }
            {auth.permissions.find((permission => permission.name === 'show_calculation_types')) &&
              <Sidebar.Item href={route('calculationTypes.index')} active={route().current('calculationTypes.*')}>
                Calculation Types
              </Sidebar.Item>
            }
          </Sidebar.Collapse>
          <hr />
          <Sidebar.Item
            href={route('profile.edit')} active={route().current('profile.*')}
            icon={HiUser}
          >
            <p>
              Profile
            </p>
          </Sidebar.Item>
          <Link
            className="w-full text-left"
            href={route('logout')}
            method={"post"}
            as="button"
          >
            <Sidebar.Item
              icon={HiLogout}
            >
              <p>
                Log Out
              </p>
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar >
  )
}