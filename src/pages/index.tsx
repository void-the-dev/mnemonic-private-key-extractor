import KeyTable from "@/components/KeyTable";
import { Key } from "@/types";
import {
  getAccount,
  getAddress,
  getPrivateKey,
  getRootAccount,
} from "@/utils/address";
import { useCallback, useState } from "react";

export default function Home() {
  const [mnemonic, setMnemonic] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [addressNumber, setAddressNumber] = useState(10);
  const [loading, setLoading] = useState(false);
  const [changeKeys, setChangeKeys] = useState<Key[]>([]);
  const [privateKeys, setPrivateKeys] = useState<Key[]>([]);

  const submit = useCallback(() => {
    setLoading(true);
    setPrivateKeys([]);

    // Delay to show loading
    setTimeout(() => {
      try {
        const root = getRootAccount(mnemonic, passphrase);
        const account = getAccount(root, 0);
        const allPrivateKeys = [];
        const allChangeKeys = [];
        for (let i = startIndex; i < startIndex + addressNumber; i++) {
          allPrivateKeys.push({
            address: getAddress(account, i, false),
            key: getPrivateKey(account, i, false),
          });
          allChangeKeys.push({
            address: getAddress(account, i, true),
            key: getPrivateKey(account, i, true),
          });
        }
        setPrivateKeys(allPrivateKeys);
        setChangeKeys(allChangeKeys);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [mnemonic, startIndex, addressNumber, passphrase]);

  return (
    <main className={`p-24`}>
      <h1 className="text-4xl font-bold text-center">
        Get private keys from a mnemonic / seed phrase
      </h1>

      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="mnemonic"
          >
            Mnemonic / seed phrase
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="mnemonic"
            type="password"
            placeholder="void bandit void rose"
            onChange={(e) => setMnemonic(e.target.value)}
            value={mnemonic}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="mnemonic"
          >
            Passphrase (optional)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="passphrase"
            type="password"
            placeholder="passphrase when creating the wallet"
            onChange={(e) => setPassphrase(e.target.value)}
            value={passphrase}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold "
            htmlFor="startIndex"
          >
            Start index
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="startIndex"
            type="number"
            onChange={(e) => setStartIndex(Number(e.target.value))}
            value={startIndex}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="addresses"
          >
            Number of addresses
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="addresses"
            type="number"
            onChange={(e) => setAddressNumber(Number(e.target.value))}
            value={addressNumber}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            disabled={loading}
            onClick={submit}
          >
            {loading ? "Loading..." : "Get private keys"}
          </button>
        </div>
        <span className="block text-right mt-4 text-gray-700 text-sm italic">
          Made by{" "}
          <a
            className="underline cursor-pointer"
            href="https://twitter.com/void_the_dev"
          >
            @void
          </a>
          <br />A{" "}
          <a
            className="underline cursor-pointer"
            href="https://bitcoin-bandits.com"
          >
            Bitcoin Bandit
          </a>
        </span>
      </form>

      <KeyTable keys={privateKeys} title="Receiving addresses" />
      <KeyTable keys={changeKeys} title="Change addresses" />
    </main>
  );
}
