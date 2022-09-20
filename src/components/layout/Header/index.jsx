import Head from 'next/head'
import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {isEmpty} from 'lodash'
import Link from 'next/link'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const Header = ({ header }) => {
	const {headerMenuItems, siteTitle, siteDescription, siteLogoUrl, favicon} = header || {};
	console.warn( 'header', header);

	const [open, setOpen] = useState(false)
	return (
		  <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {!isEmpty(headerMenuItems) && headerMenuItems.length ? headerMenuItems.map((menuItem) => (
                        <Tab
                          key={menuItem?.ID}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
                              'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium'
                            )
                          }
                        >
                          {menuItem?.title}
                        </Tab>
                      )): null }
                     
                    </Tab.List>
                  </div>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  <div className="flow-root">
                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                      Create account
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-200 py-6 px-4">
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        {/* NAV bar */}
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">{ siteTitle || '' }</span>
                  <img
                    className="h-8 w-auto"
                    src={ siteLogoUrl || 'favicon.ico'}
                    alt=""
                  />
                </a>
              </div>

              {/* Flyout menus */}
              

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                 <Link href="#" >
				  <a  className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Se connecter
                  </a>
				  </Link>
				  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                 <Link href="#">
				  <a  className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Créer FLYOUT
                  </a>
				  </Link>
                </div>


                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <p className="flex h-10 items-center justify-center bg-grey-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
        {/*DESKTOP Menu*/}
          <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {!isEmpty(headerMenuItems) && headerMenuItems.length ? headerMenuItems.map((menuItem) => (
                    <Popover key={menuItem.ID} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            dangerouslySetInnerHTML={{__html: menuItem.title}}  />
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {!isEmpty(menuItem.children) && menuItem.children.length ? menuItem.children?.map((menuItem) => (
                                        <div key={menuItem?.ID} className="group relative text-base sm:text-sm">
                                    <Link href={menuItem.children?.href}>
                                      <a  className="mt-6 block font-medium text-gray-900">
                                        <span className="absolute inset-0 z-10" aria-hidden="true" dangerouslySetInnerHTML={{__html: menuItem?.title}} />
                                      </a>
                                    </Link>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      )): null }
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                      {!isEmpty(menuItem.children) && menuItem.length ? menuItem.map((item) => (
                                        <div key={item.ID}>
                                          <p id={`${item.title}-heading`} className="font-medium text-gray-900">
                                            {item.title}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${menuItem.title}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {!isEmpty(menuItem?.children) && menuItem?.children.length ? menuItem?.children.map((item) => (
                                              <li key={item?.title} className="flex">
                                                <a href={item.href} className="hover:text-gray-800" dangerouslySetInnerHTML={{__html: item.title}} />
                                              </li>
                                            )): null }
                                          </ul>
                                        </div>
                                      )): null }
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  )): null }

                </div>
              </Popover.Group>
        </p>
      </header>
    </div>
	)
};

export default Header;


