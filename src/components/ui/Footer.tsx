"use client";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/src/components/ui/Button";

const Footer = () => {
  const current_year = new Date().getFullYear();
  return (
    <div id="section_footer">
      <div className="text-center py-6 pt-10">
        <Link
          href="/Terms_Privacidad_Contact"
          target="_blank"
          className={buttonVariants({
            className: "",
            variant: "link",
          })}
        >
          Privacy
        </Link>
        <span> | </span>
        <Link
          href="/Terms_Privacidad_Contact"
          target="_blank"
          className={buttonVariants({
            className: "",
            variant: "link",
          })}
        >
          Terms
        </Link>
        <span> | </span>
        <Link
          href="mailto:EXAMBA<maria.risques@estudiantat.upc.edu>"
          className={buttonVariants({
            className: "",
            variant: "link",
          })}
        >
          Contact
        </Link>
        <p>Copyright © {current_year}, EXAMBA All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
