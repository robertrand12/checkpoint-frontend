import CountryCard from "@/components/CountryCard";
import {
  useCountriesQuery,
  useCreateCountryMutation,
  CountriesDocument,
  CountriesQuery,
  useContinentsQuery,
} from "@/graphql/generated/schema";
import client from "@/graphql/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CountryList() {
  const { data, refetch } = useCountriesQuery();
  const countries = data?.countries || [];

  const [createCountry] = useCreateCountryMutation();

  const { data: continentsData } = useContinentsQuery();

  const continents = continentsData?.continents || [];

  const notify = () => toast.success("Successful country addition");

  return (
    <>
      <form
        className="w-11/12 lg:w-10/12 lg:flex gap-6 justify-center items-center lg:h-32 bg-background mx-auto mt-6 border rounded-lg shadow-md p-6"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const data = new FormData(form);
          const json: any = Object.fromEntries(data.entries());
          json.continent = { id: parseInt(json.continent, 10) };

          try {
            const { data } = await createCountry({
              variables: { data: json as any },
            });
            if (data?.addCountry) {
              CountriesDocument;

              client.writeQuery<CountriesQuery>({
                query: CountriesDocument,
                data: {
                  countries: [data.addCountry, ...countries],
                },
              });
            }
            form.reset();
            refetch();
            notify();
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <label htmlFor="name" className="flex flex-col p-4">
          Name
          <input
            type="text"
            id="name"
            name="name"
            className="mr-2 mt-2 border-2 h-10 border-secondary rounded-lg block w-full p-2"
            required
          />
        </label>
        <label htmlFor="emoji" className="flex flex-col p-4">
          Emoji
          <input
            type="text"
            id="emoji"
            name="emoji"
            className="mr-2 mt-2 border-2 h-10 border-secondary rounded-lg block w-full p-2"
            required
          />
        </label>
        <label htmlFor="code" className="flex flex-col p-4">
          Code
          <input
            type="text"
            id="code"
            name="code"
            className="mr-2 mt-2 border-2 h-10 border-secondary rounded-lg block w-full p-2"
            required
          />
        </label>
        <label htmlFor="continent" className="flex flex-col p-4">
          Continent
          <select
            className="mr-2 mt-2 border-2 h-10 border-secondary rounded-lg block w-full p-2"
            id="continent"
            name="continent"
            required
          >
            {continents.map((continent) => (
              <option key={continent.id} value={continent.id}>
                {continent.name}
              </option>
            ))}
          </select>
        </label>
        <div className="flex justify-center items-center">
          <button className=" bg-primary text-secondary p-3 rounded-md">
            Add
          </button>
        </div>
      </form>
      <ul className="flex gap-2 justify-center flex-wrap mt-6">
        {countries.map((country) => (
          <li key={country.id}>
            <CountryCard
              country={country}
              link={`/countries/${country.code}`}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
