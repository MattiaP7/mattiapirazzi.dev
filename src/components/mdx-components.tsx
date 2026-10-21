import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CodeBlock } from "./code-block";

const calloutStyles = {
  note: "border-blue-500 bg-blue-50 dark:bg-blue-950/30",
  tip: "border-green-500 bg-green-50 dark:bg-green-950/30",
  warning: "border-amber-500 bg-amber-50 dark:bg-amber-950/30",
  danger: "border-red-500 bg-red-50 dark:bg-red-950/30",
};

export const mdxComponents = {
  pre: CodeBlock,

  h2: ({
    children,
    id,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 id={id} className="group scroll-mt-24" {...props}>
      {children}
      {id && (
        <a
          href={`#${id}`}
          aria-label="Link alla sezione"
          className="ml-2 no-underline opacity-0 group-hover:opacity-100 text-neutral-400 transition-opacity"
        >
          #
        </a>
      )}
    </h2>
  ),

  h3: ({
    children,
    id,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 id={id} className="group scroll-mt-24" {...props}>
      {children}
      {id && (
        <a
          href={`#${id}`}
          aria-label="Link alla sezione"
          className="ml-2 no-underline opacity-0 group-hover:opacity-100 text-neutral-400 transition-opacity"
        >
          #
        </a>
      )}
    </h3>
  ),

  // Citazioni
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-4 border-neutral-300 dark:border-neutral-700 pl-4 italic text-neutral-600 dark:text-neutral-400"
      {...props}
    />
  ),

  hr: () => <hr className="my-10 border-neutral-200 dark:border-neutral-800" />,

  // Box informativi: <Callout type="tip" title="Suggerimento">testo</Callout>
  Callout: ({
    type = "note",
    title,
    children,
  }: {
    type?: keyof typeof calloutStyles;
    title?: string;
    children: React.ReactNode;
  }) => (
    <div className={`my-6 rounded-r-xl border-l-4 p-4 ${calloutStyles[type]}`}>
      {title && <p className="font-semibold mb-1">{title}</p>}
      <div className="text-sm [&>p]:my-0">{children}</div>
    </div>
  ),

  Image: (props: React.ComponentProps<typeof Image>) => (
    <div className="my-6 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
      <Image
        {...props}
        alt={props.alt || "Immagine blog"}
        className="w-full object-cover"
      />
    </div>
  ),

  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <div className="my-6 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...props} alt={props.alt || ""} className="w-full object-cover" />
    </div>
  ),

  // Componente Link per next/link
  Link: ({ href, children, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      href={href}
      className="text-blue-600 dark:text-blue-400 underline underline-offset-4 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
      {...props}
    >
      {children}
    </Link>
  ),

  a: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href && (href.startsWith("/") || href.startsWith("#"));
    if (isInternal) {
      return (
        <Link
          href={href}
          className="text-blue-600 dark:text-blue-400 underline underline-offset-4 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 underline underline-offset-4 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        {...props}
      >
        {children}
      </a>
    );
  },

  // Componente Video
  Video: ({
    src,
    controls = true,
    ...props
  }: React.VideoHTMLAttributes<HTMLVideoElement>) => (
    <div className="my-6 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-black">
      <video
        src={src}
        controls={controls}
        className="w-full h-auto"
        {...props}
      />
    </div>
  ),

  // Tabelle formattate
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),

  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead
      className="bg-neutral-100 dark:bg-neutral-800/80 text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-800 font-semibold"
      {...props}
    />
  ),

  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-3" {...props} />
  ),

  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-3 border-b border-neutral-200/60 dark:border-neutral-800/50"
      {...props}
    />
  ),
};
