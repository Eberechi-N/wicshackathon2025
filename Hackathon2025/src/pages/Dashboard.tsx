//import { SearchBar } from 'react-native-elements';
import { TextField } from "@radix-ui/themes";

function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-10 grid-rows-6 gap-4 h-[100vh] w-[100vw] p-10">
        <div className="col-span-2 row-span-6 bg-neutral-700 rounded-xl">
          <h1 className="font-bold text-5xl p-3 text-center">BandTech</h1>
          <TextField.Root placeholder="Search the docs…" size={"3"} variant={"soft"} color="gray">
            <TextField.Slot></TextField.Slot>
          </TextField.Root>
        </div>
        <div className="col-span-3 row-span-2 col-start-3 bg-neutral-200 rounded-2xl">
          3
        </div>
        <div className="col-span-3 row-span-2 col-start-3 row-start-3 bg-neutral-500 rounded-2xl">
          4
        </div>
        <div className="col-span-3 row-span-2 col-start-3 row-start-5 bg-neutral-500 rounded-2xl">
          5
        </div>
        <div className="col-span-5 row-span-2 col-start-6 row-start-1 bg-neutral-500 rounded-2xl">
          6
        </div>
        <div className="col-span-5 row-span-2 col-start-6 row-start-3 bg-neutral-500 rounded-2xl">
          7
        </div>
        <div className="col-span-5 row-span-2 col-start-6 row-start-5 bg-neutral-500 rounded-2xl">
          8
        </div>
      </div>
    </>
  );
}

export default Dashboard;
