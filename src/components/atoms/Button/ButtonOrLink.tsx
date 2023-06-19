/* eslint-disable react/button-has-type */
import React, { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

export type ButtonOrLinkProps =
  | (ComponentPropsWithoutRef<"button"> & {
      target?: never;
      rel?: never;
      linkType?: never;
    })
  | (ComponentPropsWithoutRef<"a"> & {
      href: React.ComponentProps<typeof Link>["href"];
      type?: never;
      linkType?: string;
    });

export type Props = ButtonOrLinkProps;

export type Ref = HTMLButtonElement | HTMLAnchorElement;

export type InferRef<S extends "button" | "a"> = S extends "button"
  ? React.ForwardedRef<HTMLButtonElement>
  : React.ForwardedRef<HTMLAnchorElement>;

/**
 * This is a wrapper that renders a component either as a Link(a) or as a Button
 * It would render appropriately the needed html element with the correct props
 *
 * If element is Link, and type is needed, use `linkType` instead
 *
 * `type`
 * Hints at the linked URL's format with a MIME type. No built-in functionality.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
 */
const ButtonOrLink = React.forwardRef<Ref, ButtonOrLinkProps>(
  ({ children, ...props }, ref) => {
    const isLink = "href" in props;

    if (isLink)
      return (
        <Link
          {...props}
          ref={ref as InferRef<"a">}
          type={props.linkType}
          href={props.href}
        >
          {children}
        </Link>
      );

    return (
      <button
        {...props}
        type={props?.type ?? "button"}
        ref={ref as InferRef<"button">}
      >
        {children}
      </button>
    );
  }
);

ButtonOrLink.displayName = "ButtonOrLink";

export default ButtonOrLink;
