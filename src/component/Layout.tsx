import Navbar from "./Navbar";
import { ReactNode } from "react";

interface LayoutProps {
 children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
 return (
  <div className="layout__div">
   <Navbar />
   {children}
  </div>
 );
}
