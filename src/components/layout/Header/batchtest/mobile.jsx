import Head from "next/head";
import { Fragment, useState, forwardRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SearchIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { isEmpty } from "lodash";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = ({ header }) => {
  const { headerMenuItems, siteTitle, siteDescription, siteLogoUrl, favicon } = header || {};
  console.warn("header", header);

  const MyLink = forwardRef((props, ref) => {
    const { href, children, ...rest } = props;
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
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <div className="mt-2 px-4 space-y-2">
                {isEmpty(headerMenuItems)
                  ? null
                  : headerMenuItems.map((menuItem) => (
                      <div key={menuItem?.title}>
                        <p
                          id={`${menuItem?.title}-heading-mobile`}
                          className="font-medium text-gray-900"
                        >
                          {menuItem?.title}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${menuItem?.title}-heading-mobile`}
                          className="mt-2 space-y-2"
                        >
                          {menuItem?.children.map((child) => (
                            <li key={child?.ID} className="flow-root">
                              <MyLink
                                href={child?.url}
                                className="-m-2 p-2 block font-medium text-gray-900"
                              >
                                {child?.title}
                              </MyLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </Transition.Child>
      </Transition.Root>
    </div>
  );
};

export default Header;