import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Flight OOP Visualizer",
  description: "OOP 상속 구조 시각화 - FlightADT 다형성 인터랙티브 데모",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
