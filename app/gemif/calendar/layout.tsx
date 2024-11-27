

export default function GemifLayout({
  modal,
  children,
}: {
  modal: React.ReactNode;
  children: Readonly<React.ReactNode>;
}) {

  

  return (
    <>
      {modal}
      {children}
    </>
);
}