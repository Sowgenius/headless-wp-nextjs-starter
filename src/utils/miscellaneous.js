import DOMPurify from "dompurify";

import React from 'react'

export const sanitize = ( content ) => {
  return process.browser ? DOMPurify.sanitize( content ) : content;
}

