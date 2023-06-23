import Head from "next/head";
import { Fragment, useState, forwardRef } from "react";
import { Dialog, Popover, Tab, Transition, Menu } from "@headlessui/react";
import {
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  XIcon,
} from "@heroicons/react/outline";
import { isEmpty } from "lodash";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = ({ header }) => {
  const { headerMenuItems, siteTitle, siteDescription, siteLogoUrl, favicon } =
    header || {};
  console.warn("header", header);

  const MyLink = forwardRef((props, ref) => {
    let { href, children, ...rest } = props;
    return (
      <Link href={href}>
        <a ref={ref} {...rest}>
          {children}
        </a>
      </Link>
    );
  });
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <SearchIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex px-4 space-x-8">
                    {isEmpty(headerMenuItems) && headerMenuItems
                      ? headerMenuItems?.map((menuItem) => (
                          <Tab
                            key={menuItem?.title}
                            className={({ selected }) =>
                              classNames(
                                selected
                                  ? "text-indigo-600 border-indigo-600"
                                  : "text-gray-900 border-transparent",
                                "flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium"
                              )
                            }
                          >
                            {menuItem?.title}
                          </Tab>
                        ))
                      : null}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {!isEmpty(headerMenuItems) && headerMenuItems.length
                    ? headerMenuItems?.map((items) => (
                        <Tab.Panel
                          key={items?.title}
                          className="pt-10 pb-8 px-4 space-y-10"
                        >
                          <div className="grid grid-cols-2 gap-x-4">
                            {items?.children.map((child) => (
                              <div
                                key={child?.ID}
                                className="group relative text-sm"
                              >
                                <MyLink
                                  href={child?.url}
                                  className="mt-6 block font-medium text-gray-900"
                                >
                                  <span
                                    className="absolute z-10 inset-0"
                                    aria-hidden="true"
                                  />
                                  {child?.title}
                                </MyLink>
                              </div>
                            ))}
                          </div>
                          {items?.children.map((menuItem) => (
                            <div key={menuItem?.ID}>
                              <p
                                id={`${menuItem?.ID}-${menuItem?.ID}-heading-mobile`}
                                className="font-medium text-gray-900"
                              >
                                {menuItem?.title}
                              </p>
                              <ul
                                role="list"
                                aria-labelledby={`${menuItem?.ID}-${menuItem?.ID}-heading-mobile`}
                                className="mt-6 flex flex-col space-y-6"
                              >
                                {menuItem?.children?.map((item) => (
                                  <li key={item?.ID} className="flow-root">
                                    <MyLink
                                      href={item?.url}
                                      className="-m-2 p-2 block text-gray-500"
                                    >
                                      {item?.title}
                                    </MyLink>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </Tab.Panel>
                      ))
                    : null}
                </Tab.Panels>
              </Tab.Group>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {headerMenuItems?.map((menuItem) => (
                  <div key={menuItem?.ID} className="flow-root">
                    <MyLink
                      href={menuItem.url}
                      className="-m-2 p-2 block font-medium text-gray-900"
                    >
                      {menuItem.title}
                    </MyLink>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <MyLink
                    href="#"
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    Se connecter mobile
                  </MyLink>
                </div>
                <div className="flow-root">
                  <MyLink
                    href="#"
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    Creer compte mobile
                  </MyLink>
                </div>
              </div>

              <div className="border-t border-gray-200 py-6 px-4">
                <MyLink href="#" className="-m-2 p-2 flex items-center">
                  <img
                    src="https://tailwindui.com/img/flags/flag-canada.svg"
                    alt=""
                    className="w-5 h-auto block flex-shrink-0"
                  />
                  <span className="ml-3 block text-base font-medium text-gray-900">
                    CAD
                  </span>
                  <span className="sr-only">, change currency</span>
                </MyLink>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
      {/* Desktop Menu */}
      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="h-16 flex items-center">
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <MyLink href="/">
                  <span className="sr-only">Workflow</span>
                  <img
                    className="h-8 w-auto"
                    src={siteLogoUrl || favicon}
                    alt={siteTitle}
                  />
                </MyLink>
              </div>

              {/* Flyout menus */}

              <div className="mr-auto ml-auto flex items-center"></div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <MyLink
                    href="#"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Se connecter
                  </MyLink>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <MyLink
                    href="#"
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    Créer compte
                  </MyLink>
                </div>

                {/* Recherche */}
                <div className="flex lg:ml-6">
                  <MyLink
                    href="#"
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Recherche</span>
                    <SearchIcon className="w-6 h-6" aria-hidden="true" />
                  </MyLink>
                </div>

                {/* Panier */}
                <div className="ml-4 flow-root lg:ml-6">
                  <MyLink href="#" className="group -m-2 p-2 flex items-center">
                    <ShoppingBagIcon
                      className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      0
                    </span>
                    <span className="sr-only">
                      dans votre panier, voir panier
                    </span>
                  </MyLink>
                </div>
              </div>
            </div>
          </div>
          <p className="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="h-full flex space-x-8">
                {!isEmpty(headerMenuItems) && headerMenuItems.length
                  ? headerMenuItems.map((menuItem) => (
                      <Popover
                        as={Menu}
                        key={menuItem?.pageID}
                        className="flex"
                      >
                        {({ open }) => (
                          <>
                            <div className="relative flex">
                              <Menu.Button
                                className={classNames(
                                  open
                                    ? "border-indigo-600 text-indigo-600"
                                    : "border-transparent text-gray-700 hover:text-gray-800",
                                  "relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px"
                                )}
                                dangerouslySetInnerHTML={{
                                  __html: menuItem.title,
                                }}
                              ></Menu.Button>
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
                              <Popover.Panel
                                as={Menu.Items}
                                className="absolute top-full inset-x-0 text-sm text-gray-500"
                              >
                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                <div
                                  className="absolute inset-0 top-1/2 bg-white shadow"
                                  aria-hidden="true"
                                />
                                {menuItem?.children?.map((menuItem) => (
                                  <div className="relative bg-white">
                                    <div className="max-w-7xl mx-auto px-8">
                                      <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                        <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                          <div key={menuItem?.pageID}>
                                            <p
                                              id={`${menuItem?.title}-heading`}
                                              className="font-medium text-gray-900"
                                              dangerouslySetInnerHTML={{
                                                __html: menuItem.title,
                                              }}
                                            ></p>
                                            <ul
                                              role="list"
                                              aria-labelledby={`${menuItem.title}-heading`}
                                              className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                            >
                                              {menuItem?.children?.map(
                                                (item) => (
                                                  <Menu.Item
                                                    key={item.pageID}
                                                    className="flex"
                                                  >
                                                    <MyLink
                                                      href={item.url}
                                                      className="hover:text-gray-800"
                                                      dangerouslySetInnerHTML={{
                                                        __html: item.title,
                                                      }}
                                                    ></MyLink>
                                                  </Menu.Item>
                                                )
                                              )}
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    ))
                  : null}
              </div>
            </Popover.Group>
          </p>
        </nav>
      </header>
    </div>
  );
};

export default Header;
