interface HeaderProps {
  label: string;
}

const Header = ({
  label,
}: HeaderProps) => {

  return (
    <h1 className="text-5xl font-bold text-black dark:text-white">
  {label}
</h1>

  );
};
export default Header;
