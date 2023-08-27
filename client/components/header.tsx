import React from "react";
import Link from "next/link";

const Header = ({ currentUser }) => {
    console.log("-> currerntUser : ", currentUser)
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConf) => linkConf)
    .map(({ label, href }) => <li key={href} className="nav-item">
        <Link href={href}>
            <p className="nav-link">{label}</p>
        </Link>
    </li>);

  return (
    <nav className="navbar navbar-light bg-light">
      <Link className="navbar-brand" href="/">
        GitTix
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {links}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
