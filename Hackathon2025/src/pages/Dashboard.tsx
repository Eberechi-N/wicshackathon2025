//import { SearchBar } from 'react-native-elements';
import {
  HomeIcon,
  CircleDollarSign,
  Plus,
  Minus,
  CreditCard,
  Hash,
  Gamepad2,
  Receipt,
  TreePalm,
  PartyPopper,
} from "lucide-react";
import { Separator } from "radix-ui";
import { motion } from "framer-motion";

function Dashboard() {
  var topIconColor = "#d4d4d4";
  var iconColor = "#a3a3a3";
  var transactionIconColors = "#262626";

  var transactions: any = [
    {
      name: "McDonalds",
      account: "****-2353",
      money: "234.23",
      logo: "sub",
      type: "Food",
    },
    {
      name: "Paycheck",
      account: "****-2353",
      money: "116.23",
      logo: "add",
      type: "Income",
    },
  ];

  var accounts: any = [
    {
      name: "Checking",
      account: "****-2353",
      money: "351.67",
      logo: "add",
      type: "Debit",
    },
    {
      name: "Savings",
      account: "****-9045",
      money: "1864.53",
      logo: "add",
      type: "Credit",
    },
  ];

  var goals = [
    { name: "Xbox", price: "499.99", logo: "game" },
    { name: "Birthday", price: "300.00", logo: "party" },
    { name: "Vacation", price: "6500.00", logo: "trip" },
    { name: "Bills", price: "324.62", logo: "bill" },
  ];

  return (
    <>
      <div className="grid grid-cols-10 grid-rows-6 gap-4 h-[100vh] w-[100vw] p-10">
        {/*Sidebar*/}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="col-span-2 row-span-6 bg-neutral-800 rounded-xl pt-2"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex justify-center items-center"
          >
            <HomeIcon color={topIconColor} size={50} />
            <h1 className="font-bold text-5xl p-3 text-center text-neutral-300">
              BandTech
            </h1>
          </motion.div>
          <Separator.Root
            className="bg-neutral-900 h-[2px] w-[90%]"
            style={{ margin: "15px 5%" }}
          />
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex justify-center items-center"
          >
            <HomeIcon color={iconColor} size={30} />
            <h1 className="font-bold text-3xl text-center text-neutral-400 pl-2">
              Home
            </h1>
          </motion.div>

          <Separator.Root
            className="bg-neutral-900 h-[2px] w-[90%]"
            style={{ margin: "15px 5%" }}
          />
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex justify-center items-center"
          >
            <HomeIcon color={iconColor} size={30} />
            <h1 className="font-bold text-3xl text-center text-neutral-400 pl-2">
              Home
            </h1>
          </motion.div>
          <Separator.Root
            className="bg-neutral-900 h-[2px] w-[90%]"
            style={{ margin: "15px 5%" }}
          />
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex justify-center items-center"
          >
            <HomeIcon color={iconColor} size={30} />
            <h1 className="font-bold text-3xl text-center text-neutral-400 pl-2">
              Home
            </h1>
          </motion.div>
          <Separator.Root
            className="bg-neutral-900 h-[2px] w-[90%]"
            style={{ margin: "15px 5%" }}
          />
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex justify-center items-center"
          >
            <HomeIcon color={iconColor} size={30} />
            <h1 className="font-bold text-3xl text-center text-neutral-400 pl-2">
              Home
            </h1>
          </motion.div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="col-span-3 row-span-2 col-start-3 bg-neutral-100 rounded-2xl"
        >
          3
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="col-span-3 row-span-2 col-start-3 row-start-3 bg-neutral-100 rounded-2xl"
        >
          4
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="col-span-3 row-span-2 col-start-3 row-start-5 bg-neutral-100 rounded-2xl"
        >
          5
        </motion.div>
        {/*Accounts*/}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="col-span-5 row-span-2 col-start-6 row-start-1 bg-neutral-100 rounded-2xl px-4"
        >
          <h1 className="font-semibold text-4xl p-4 text-center text-neutral-800">
            Accounts
          </h1>
          <div className="flex flex-col gap-4">
            {accounts.map((account: any, index: any) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                key={index}
                className="grid grid-cols-4 grid-rows-1 pl-4 bg-neutral-200 rounded-3xl p-2"
              >
                <div className="flex justify-start items-center  col-span-2">
                  <CreditCard
                    size={70}
                    strokeWidth={2.5}
                    color={transactionIconColors}
                  />
                  <div className=" justify-start my-auto pl-4">
                    <h1 className="text-3xl font-[550]">{account.name}</h1>
                    <h1 className="text-xl font-[450]">{account.type}</h1>
                  </div>
                </div>

                <div className="flex justify-start my-auto gap-5">
                  <Hash
                    size={35}
                    strokeWidth={2.5}
                    color={transactionIconColors}
                  />
                  <h1 className="text-xl font-[550]">{account.account}</h1>
                </div>
                <div className="my-auto flex justify-end pr-5 pb-2">
                  {account.logo == "add" ? (
                    <h1 className="text-xl font-[550] my-auto text-lime-700">
                      ${account.money}
                    </h1>
                  ) : (
                    <h1 className="text-xl font-[550] my-auto text-red-800">
                      -${account.money}
                    </h1>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="col-span-5 row-span-2 col-start-6 row-start-3 bg-neutral-100 rounded-2xl px-4"
        >
          <h1 className="font-semibold text-5xl p-4  text-neutral-800">
            Goals
          </h1>
          <div className="flex gap-4">
            {goals.map((goal: any, index: any) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                key={index}
                className="pl-4 bg-neutral-200 rounded-3xl p-2"
              >
                <div className="flex justify-start items-start flex-col">
                  {goal.logo == "party" ? (
                    <PartyPopper size={50} />
                  ) : goal.logo == "trip" ? (
                    <TreePalm size={50}/>
                  ) : goal.logo == "bill" ? (
                    <Receipt size={50}/>
                  ) : goal.logo == "game" ? (
                    <Gamepad2 size={50}/>
                  ) : null}

        
                  <h1 className="text-3xl font-[600]">{goal.name}</h1>
                  <h1 className="text-2xl font-[450]">{goal.name}</h1>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="col-span-5 px-4 row-span-2 col-start-6 row-start-5 bg-neutral-100 rounded-2xl"
        >
          <h1 className="font-semibold text-4xl p-4 text-center text-neutral-800">
            Recent Transactions
          </h1>

          <div className="flex flex-col gap-4">
            {transactions.map((transaction: any, index: any) => (
              <motion.div
                whileHover={{ scale: 1.02 }}
                key={index}
                className="grid grid-cols-4 grid-rows-1 pl-4 gap-4 bg-neutral-200 rounded-3xl p-2"
              >
                <div className="flex justify-start items-center col-span-2">
                  {transaction.logo == "add" ? (
                    <Plus
                      size={40}
                      strokeWidth={2.5}
                      color={transactionIconColors}
                    />
                  ) : (
                    <Minus
                      size={30}
                      strokeWidth={3}
                      color={transactionIconColors}
                    />
                  )}

                  <CircleDollarSign
                    size={70}
                    strokeWidth={2.5}
                    color={transactionIconColors}
                  />
                  <div className=" justify-start my-auto pl-4">
                    <h1 className="text-3xl font-[550]">{transaction.name}</h1>
                    <h1 className="text-xl font-[450]">{transaction.type}</h1>
                  </div>
                </div>

                <div className="flex justify-start my-auto gap-5">
                  <CreditCard
                    size={35}
                    strokeWidth={2.5}
                    color={transactionIconColors}
                  />
                  <h1 className="text-xl font-[550]">{transaction.account}</h1>
                </div>
                <div className="my-auto flex justify-end pr-5 pb-2">
                  {transaction.logo == "add" ? (
                    <h1 className="text-xl font-[550] my-auto text-lime-700">
                      ${transaction.money}
                    </h1>
                  ) : (
                    <h1 className="text-xl font-[550] my-auto text-red-800">
                      -${transaction.money}
                    </h1>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Dashboard;
