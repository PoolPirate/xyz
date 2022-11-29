import { Link } from "@remix-run/react";

import type { RemixLinkProps } from "@remix-run/react/dist/components";
import clsx from "clsx";
import { Card } from "~/components/Card";

const ColumnSizes = {
  6: "grid-cols-6",
  12: "grid-cols-12",
};

const ColSpans = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
};

type ColumnSize = 6 | 12;
type ColSpan = 1 | 2 | 3 | 4;

/**
 * "table" of cards with a header. Choose between 6 and 12 columns. Up to the user to ensure headers and columns line up.
 */
export function Table({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function Header({ columns, ...props }: { columns: ColumnSize } & React.ComponentProps<"div">) {
  return (
    <div className={clsx("grid gap-x-1 items-end px-4", ColumnSizes[columns], props.className)}>{props.children}</div>
  );
}

Header.Column = function HeaderColumn({ span = 1, ...props }: { span?: ColSpan } & React.ComponentProps<"div">) {
  return (
    <div className={clsx(ColSpans[span], props.className)} {...props}>
      {props.children}
    </div>
  );
};

export function Row({ columns, ...props }: { columns: ColumnSize } & RemixLinkProps) {
  return (
    <>
      {/* Desktop */}
      <Card asChild>
        <Link
          className={clsx(
            "hidden lg:grid gap-y-3 gap-x-1 items-center px-4 py-5 mb-4",
            `lg:${ColumnSizes[columns]}`,
            props.className
          )}
          {...props}
        >
          {props.children}
        </Link>
      </Card>
      {/* Mobile */}
      <Card asChild>
        <Link
          className={clsx("lg:hidden grid grid-cols-2 gap-y-3 gap-x-1 items-center px-4 py-5 mb-4", props.className)}
          {...props}
        >
          {props.children}
        </Link>
      </Card>
    </>
  );
}

Row.Column = function RowColumn({ span = 1, ...props }: { span?: ColSpan } & React.ComponentProps<"div">) {
  return <div className={clsx(ColSpans[span], props.className)}>{props.children}</div>;
};
