import { Link } from "react-router-dom";

export default function NavLinks({ location }) {
  const categories = [
    { name: "Women", path: "/women" },
    { name: "Men", path: "/men" },
    { name: "Kids", path: "/kids" },
    { name: "All Collections", path: "/collections" },
  ];

  return (
    <nav className="flex gap-6 text-gray-700 font-medium h-full">
      {categories.map((cat) => {
        const isActive =
          (cat.path === "/women" &&
            (location.pathname === "/" || location.pathname === "/women")) ||
          location.pathname === cat.path;

        return (
          <Link
            key={cat.name}
            to={cat.path}
            className={`flex items-center ${
              isActive
                ? "border-b-2 border-black text-black"
                : "hover:text-black"
            }`}
          >
            {cat.name}
          </Link>
        );
      })}
    </nav>
  );
}
