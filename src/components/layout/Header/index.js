import { Fragment, useState, useEffect, forwardRef, useContext } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { isEmpty } from "lodash";
import Link from "next/link";
import { AppContext } from "../../context";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = ({ header }) => {
  const [cart, setCart] = useContext(AppContext);

  const { headerMenuItems, siteTitle, siteDescription, siteLogoUrl, favicon } =
    header || {};
  const [isMounted, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileMenuOpen}
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
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Fermer menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                {isMounted ? (
                  <>
                    {!isEmpty(headerMenuItems) && headerMenuItems.length ? (
                      <Tab.Group>
                        {headerMenuItems.map((menuItem) => (
                          <Fragment key={menuItem.ID}>
                            {menuItem.children && menuItem.children.length ? (
                              <Tab
                                key={menuItem.ID}
                                className="px-3 py-2 text-sm font-medium text-gray-900"
                              >
                                {menuItem.title}
                              </Tab>
                            ) : null}
                          </Fragment>
                        ))}
                        <Tab.Panels>
                          {headerMenuItems.map((menuItem) => (
                            <Tab.Panel key={menuItem.ID}>
                              {menuItem.children && menuItem.children.length ? (
                                <ul
                                  role="list"
                                  className="space-y-6 border-t border-gray-200 py-6 px-4"
                                >
                                  {menuItem.children.map((child) => (
                                    <li key={child.ID} className="flow-root">
                                      {child.children &&
                                      child.children.length ? (
                                        <>
                                          <MyLink
                                            id={`mobile-${child.ID}-heading`}
                                            className="font-medium text-gray-900"
                                            href={child.url}
                                            dangerouslySetInnerHTML={{
                                              __html: child.title,
                                            }}
                                          ></MyLink>
                                          <ul
                                            role="list"
                                            aria-labelledby={`mobile-${child.ID}-heading`}
                                            className="mt-6 space-y-6"
                                          >
                                            {child.children.map(
                                              (grandChild) => (
                                                <li
                                                  key={grandChild.ID}
                                                  className="flex"
                                                >
                                                  <MyLink
                                                    href={grandChild.url}
                                                    className="text-gray-500"
                                                    dangerouslySetInnerHTML={{
                                                      __html: grandChild.title,
                                                    }}
                                                  ></MyLink>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </>
                                      ) : null}
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                            </Tab.Panel>
                          ))}
                        </Tab.Panels>
                      </Tab.Group>
                    ) : null}
                  </>
                ) : null}

                {headerMenuItems.map((menuItem) => (
                  <Fragment key={menuItem.ID}>
                    {!(menuItem.children && menuItem.children.length) ? (
                      <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                        <div className="flow-root">
                          <MyLink
                            href={menuItem.url}
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                          >
                            {menuItem.title}
                          </MyLink>
                        </div>
                      </div>
                    ) : null}
                  </Fragment>
                ))}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Menu Desktop */}
      <header className="relative z-10">
        <nav aria-label="Top">
          {/* Top navigation */}
          <div className="bg-gray-900">
            <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">
                {siteDescription}
              </p>

              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <a
                  href="#"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Créer un compte
                </a>
                <span className="h-6 w-px bg-gray-600" aria-hidden="true" />
                <a
                  href="#"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  S'inscrire
                </a>
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="bg-white">
            <div className="border-b border-gray-200">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:items-center">
                    <MyLink href="/">
                      <span className="sr-only">{siteTitle}</span>
                      <img
                        className="h-8 w-auto"
                        src={siteLogoUrl}
                        alt="Logo"
                      />
                    </MyLink>
                  </div>
                  {isMounted ? (
                    <>
                      <div className="hidden h-full lg:flex">
                        {/* Mega menus */}
                        <Popover.Group className="ml-8">
                          <div className="flex h-full justify-center space-x-8">
                            {!isEmpty(headerMenuItems) && headerMenuItems.length
                              ? headerMenuItems.map((menuItem) => (
                                  <Popover key={menuItem.ID} className="flex">
                                    {({ open }) => (
                                      <>
                                        {menuItem.children &&
                                        menuItem.children.length > 0 ? (
                                          <div className="relative flex">
                                            <Popover.Button
                                              className={classNames(
                                                open
                                                  ? "border-indigo-600 text-indigo-600"
                                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                                              )}
                                            >
                                              {menuItem.title}
                                              <ChevronDownIcon
                                                className={classNames(
                                                  open
                                                    ? "rotate-180 transform"
                                                    : "",
                                                  "relative h-5 w-5 transition-colors duration-200 ease-out"
                                                )}
                                              />
                                            </Popover.Button>
                                          </div>
                                        ) : (
                                          <MyLink
                                            href={menuItem.url}
                                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                                            dangerouslySetInnerHTML={{
                                              __html: menuItem.title,
                                            }}
                                          ></MyLink>
                                        )}

                                        {menuItem.children &&
                                          menuItem.children.length > 0 && (
                                            <Transition
                                              as={Fragment}
                                              enter="transition ease-out duration-200"
                                              enterFrom="opacity-0"
                                              enterTo="opacity-100"
                                              leave="transition ease-in duration-150"
                                              leaveFrom="opacity-100"
                                              leaveTo="opacity-0"
                                            >
                                              <Popover.Panel className="absolute inset-x-0 top-full text-gray-500 sm:text-sm">
                                                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                                <div
                                                  className="absolute inset-0 top-1/2 bg-white shadow"
                                                  aria-hidden="true"
                                                />

                                                <div className="relative bg-white">
                                                  <div className="mx-auto max-w-7xl px-8">
                                                    <div className="grid grid-cols-1 items-start gap-y-10 gap-x-8 pt-10 pb-12">
                                                      <div className="grid grid-cols-4 gap-y-10 gap-x-8">
                                                        {menuItem.children.map(
                                                          (items) => (
                                                            <div key={items.ID}>
                                                              <MyLink
                                                                href={items.url}
                                                                id={`desktop-featured-heading-${items.ID}`}
                                                                className="font-medium text-gray-900"
                                                                dangerouslySetInnerHTML={{
                                                                  __html:
                                                                    items.title,
                                                                }}
                                                              ></MyLink>
                                                              {items.children &&
                                                                items.children
                                                                  .length >
                                                                  0 && (
                                                                  <ul
                                                                    role="list"
                                                                    aria-labelledby={`desktop-featured-heading-${items.ID}`}
                                                                    className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                  >
                                                                    {items.children.map(
                                                                      (
                                                                        item
                                                                      ) => (
                                                                        <li
                                                                          key={
                                                                            item.ID
                                                                          }
                                                                          className="flex"
                                                                        >
                                                                          <MyLink
                                                                            href={
                                                                              item.url
                                                                            }
                                                                            className="hover:text-gray-800"
                                                                            dangerouslySetInnerHTML={{
                                                                              __html:
                                                                                item.title,
                                                                            }}
                                                                          ></MyLink>
                                                                        </li>
                                                                      )
                                                                    )}
                                                                  </ul>
                                                                )}
                                                            </div>
                                                          )
                                                        )}
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </Popover.Panel>
                                            </Transition>
                                          )}
                                      </>
                                    )}
                                  </Popover>
                                ))
                              : null}
                          </div>
                        </Popover.Group>
                      </div>
                    </>
                  ) : null}

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileMenuOpen(true)}
                    >
                      <span className="sr-only">Fermer menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Search */}
                    <a
                      href="#"
                      className="ml-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </a>
                  </div>

                  {/* Logo (lg-) */}
                  <MyLink href="/" className="lg:hidden">
                    <span className="sr-only">Oumou Express</span>
                    <img
                      src={siteLogoUrl}
                      alt={siteTitle}
                      className="h-8 w-auto"
                    />
                  </MyLink>

                  <div className="flex flex-1 items-center justify-end">
                    <div className="flex items-center lg:ml-8">
                      <div className="flex space-x-8">
                        <div className="hidden lg:flex">
                          <a
                            href="#"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Recherche</span>
                            <MagnifyingGlassIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </a>
                        </div>

                        <div className="flex">
                          <a
                            href="#"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Compte</span>
                            <UserIcon className="h-6 w-6" aria-hidden="true" />
                          </a>
                        </div>
                      </div>

                      <span
                        className="mx-4 h-6 w-px bg-gray-200 lg:mx-6"
                        aria-hidden="true"
                      />

                      <div className="flow-root">
                        <MyLink
                          href="#"
                          className="group -m-2 flex items-center p-2"
                        >
                          <ShoppingCartIcon
                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                            {cart?.totalQty ? `(${cart?.totalQty})` : 0}
                          </span>
                          <span className="sr-only">
                            produits du panier, voir panier
                          </span>
                        </MyLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
