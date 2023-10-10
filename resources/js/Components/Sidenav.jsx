'use client';

import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';

export default function Sidenav() {

  const theme = {
    "root": {
      "base": "bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4 h-screen",
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
          <Sidebar.Collapse
            icon={HiChartPie}
            label="Settings"
            open={route().current('users.*') || route().current('organizations.*') || route().current('roles.*')}
          >
            <Sidebar.Item href={route('users.index')} active={route().current('users.*')}>
              Users
            </Sidebar.Item>
            <Sidebar.Item href={route('organizations.index')} active={route().current('organizations.*')}>
              Organization
            </Sidebar.Item>
            <Sidebar.Item href={route('roles.index')} active={route().current('roles.*')}>
              Roles
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item
            href="#"
            icon={HiInbox}
          >
            <p>
              Inbox
            </p>
          </Sidebar.Item>
          <Sidebar.Item
            href={route('users.index')} active={route().current('users.*')}
            icon={HiUser}
          >
            <p>
              Users
            </p>
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiShoppingBag}
          >
            <p>
              Products
            </p>
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiArrowSmRight}
          >
            <p>
              Sign In
            </p>
          </Sidebar.Item>
          <Sidebar.Item
            href="#"
            icon={HiTable}
          >
            <p>
              Sign Up
            </p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}