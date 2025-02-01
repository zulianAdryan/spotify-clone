import Header from "@/components/header";
import SearchInput from "@/components/search-input";
import getSongsByTitle from "@/actions/getSongsByTitle";
import SearchContent from "./components/search-content";

interface Props {
  searchParams: Promise<{
    title: string;
  }>;
}

export const revalidate = 0;

const Page = async ({ searchParams }: Props) => {
  const { title } = await searchParams;
  const songs = await getSongsByTitle(title);

  return (
    <div className="focus:outline-none bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default Page;
