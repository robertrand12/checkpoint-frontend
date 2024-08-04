import { Country } from "@/graphql/generated/schema";
import Link from "next/link";

type CountryCardProps = {
  country: Country;
  link: string;
};

export default function CountryCard({
  country: { name, code, continent },
  link,
}: CountryCardProps) {
  return (
    <Link href={link}>
      <div className="shadow-md border rounded-lg p-4 bg-white mr-3 mb-3 w-32 h-32">
        <img
          className="w-full object-cover rounded-md mb-3"
          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`}
          alt={name}
        />
        <p className="text-center font-bold">{name}</p>
      </div>
    </Link>
  );
}
