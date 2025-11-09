import type { SVGProps } from 'react';

export function AmazonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16.74 16.89c-1.22.42-2.83.61-4.74.61-2.92 0-5.14-.66-6.64-2.06C4 14.07 3.5 12.1 3.5 9.93 3.5 5.5 6.4 4 10.3 4c2.34 0 4.22.78 5.5 2.22" />
      <path d="M14 17.68c.52-1.31.78-2.77.78-4.28 0-1.4-.3-2.92-.8-4.52" />
      <path d="m18 13.1-4.3-1.1" />
      <path d="M12.16 19.34c.34-.54.54-1.26.54-2.12 0-.7-.12-1.3-.36-1.8" />
    </svg>
  );
}

export function EBayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 7H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M19 17h-2a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2" />
      <path d="M12 17h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
    </svg>
  );
}

export function ShopifyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7.5 7.5C7.5 5.24 9.24 3.5 11.5 3.5h.5c1.06 0 2.05.42 2.79 1.16.74.74 1.16 1.73 1.16 2.79v.5c0 2.26-1.74 4.05-3.95 4.05-2.26 0-4.05-1.74-4.05-4.05Z" />
      <path d="M16.5 16.5c0 2.26-1.74 4.05-4.05 4.05h-.5c-1.06 0-2.05-.42-2.79-1.16-.74-.74-1.16-1.73-1.16-2.79v-.5c0-2.26 1.74-4.05 4.05-4.05 2.26 0 4.05 1.74 4.05 4.05Z" />
    </svg>
  );
}
