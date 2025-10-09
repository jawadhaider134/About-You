import logo from "../../assets/logo.png"

export default function Logo() {
  return (
    <div className="flex justify-center">
      <img src={logo} alt="Logo" className="w-40 h-auto" />
    </div>
  );
}
