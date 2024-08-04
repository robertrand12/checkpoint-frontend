import { useCountryDetailsQuery } from "@/graphql/generated/schema";
import Layout from "@/layouts/layout";
import { useRouter } from "next/router";

export default function CountryDetails() {
  const router = useRouter();
  const { code } = router.query;

  const { data } = useCountryDetailsQuery({
    variables: { code: code as string },
  });

  const country = data?.country;

  console.log(country)

  return (
    <Layout>
      <div className="pt-12 pb-12 w-10/12 mx-auto">
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          {typeof country === "undefined" ? (
            "Chargement..."
          ) : (
            <div>
              <p className="text-center text-4xl font-bold">
                {country.continent?.name}
              </p>
              <img
                src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${code}.svg`}
                alt={country.name}
                className="mt-6 mb-6 w-4/12 mx-auto"
              />
              <div className=" flex justify-between">
                <div>
                  <h1 className="text-2xl text-center">{country.name}</h1>
                </div>
                <p className="text-2xl">{country.code}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
