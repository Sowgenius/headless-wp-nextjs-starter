export const HEADER_FOOTER_ENDPOINT = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/rae/v1/header-footer?header_location_id=hcms-menu-header&footer_location_id=hcms-menu-footer`;
export const GET_PRODUCTS_ENDPOINT = `${process.env.NEXT_PUBLIC_SITE_URL}/api/get-products`;

export const CART_ENDPOINT = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/rae/v1/cart/items/`;

// Countries and States
export const WOO_COUNTRIES_ENDPOINT = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/rae/v1/wc/countries/`;
export const WOO_STATES_ENDPOINT = `${ process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL }/wp-json/rae/v1/wc/states`;