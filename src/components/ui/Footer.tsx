"use client";
import React from 'react';
import Link from 'next/link';

const Footer = () => {
    const current_year = new Date().getFullYear();
    return (
      <div id="section_footer">
        <div className='text-center py-4'>
          <Link href="/Terms_Privacidad_Contact" target="_blank" className='btn btn-link'>
            Privacy
          </Link>
          <span>|</span>
          <Link href="/Terms_Privacidad_Contact" target="_blank" className='btn btn-link'>
            Terms
          </Link>
          <span>|</span>
          <Link href="mailto:EXAMBA<maria.risques@estudiantat.upc.edu>" className='btn btn-link'>
            Contact
          </Link>
          <p>Copyright © {current_year}, EXAMBA All Rights Reserved.</p>
        </div>
      </div>
    );
  }


export default Footer;