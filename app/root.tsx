import styles from "./styles/app.css";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/react/routeModules";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Shell } from "./components/Shell";

export const meta: MetaFunction = () => {
  return {
    title: "MetricsDAO",
    viewport: "width=device-width, initial-scale=1.0",
    charSet: "utf-8",
    httpEquiv: "X-UA-Compatible",
    content: "IE=edge",
    description: "Uniting the best analytical minds in the space to build the future of crypto analytics.",
    "og:image": "https://metricsdao.xyz/img/social.png",
    "og:description": "Uniting the best analytical minds in the space to build the future of crypto analytics.",
    "og:url": "https://metricsdao.xyz",
    "og:title": "Metrics DAO",
    "og:type": "website",
    "twitter:card": "summary_large_image",
    "twitter:domain": "metricsdao.xyz",
    "twitter:url": "https://metricsdao.xyz",
    "twitter:title": "Metrics DAO",
    "twitter:description": "Uniting the best analytical minds in the space to build the future of crypto analytics.",
    "twitter:image": "https://metricsdao.xyz/img/social.png",
  };
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "img/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "img/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "img/favicon-16x16.png",
    },
    {
      rel: "shortcut icon",
      href: "img/favicon.ico",
    },
  ];
};

export function ErrorBoundary({ error }: { error: Error }) {
  useEffect(() => console.error(error), [error]);
  return (
    <Document title="Error!">
      <div className="tw-container tw-mx-auto tw-space-y-3 tw-my-6 tw-bg-[#E6E6E6] tw-rounded-lg tw-p-10 tw-shadow-xl">
        <h1 className="tw-text-5xl">Uh oh, something broke.</h1>
        {error.message ? <p className="tw-hidden">{error.message}</p> : <></>}
      </div>
    </Document>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 404:
      message = "Oops! Looks like you tried to visit a page that does not exist.";
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <div className="tw-container tw-mx-auto tw-space-y-3 tw-my-6 tw-bg-[#E6E6E6] tw-rounded-lg tw-p-10 tw-shadow-xl">
        <h1 className="tw-text-5xl">
          {caught.status} {caught.statusText}
        </h1>
        <p className="tw-text-lg tw-text-zinc-500">{message}</p>
      </div>
    </Document>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

const queryClient = new QueryClient();

function Document({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <html lang="en">
      <head>
        {title ? <title>{title}</title> : null}
        <Links />
        <Meta />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-8JJWLXT88P"></script>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `            
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-8JJWLXT88P');
        `,
          }}
        ></script>
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Shell>{children}</Shell>
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
