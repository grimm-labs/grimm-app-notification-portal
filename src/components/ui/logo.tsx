import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  style?: React.CSSProperties;
}

export const Logo = ({ style }: LogoProps) => (
  <Link
    href="/dashboard"
    style={{
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      ...style,
    }}
  >
    <Image src="/grimm-logo.png" alt="Grimm App Logo" width={40} height={40} />
    <span
      style={{ fontWeight: 700, fontSize: 20, marginLeft: 12, color: "black" }}
    >
      Grimm App
    </span>
  </Link>
);
