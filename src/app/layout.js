
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Expense Tracker | Next</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
