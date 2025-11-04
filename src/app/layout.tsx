import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import React from "react";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "../../theme";

export const metadata = {
  title: "Grimm Notification Portal",
  description: "Portal de gestion des notifications push pour Grimm App",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/grimm-logo.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body suppressHydrationWarning>
        <MantineProvider theme={theme}>
          <Notifications position="bottom-right" />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
