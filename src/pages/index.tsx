import {
  getAccount,
  getAddress,
  getPrivateKey,
  getRootAccount,
} from "@/utils/address";
import { copyTextToClipboard } from "@/utils/javascript";
import { useCallback, useState } from "react";

export default function Home() {
  const [mnemonic, setMnemonic] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [addressNumber, setAddressNumber] = useState(10);
  const [loading, setLoading] = useState(false);
  const [privateKeys, setPrivateKeys] = useState<
    { address: string; key: string }[]
  >([]);

  const submit = useCallback(() => {
    setLoading(true);
    setPrivateKeys([]);

    // Delay to show loading
    setTimeout(() => {
      try {
        const root = getRootAccount(mnemonic, passphrase);
        const account = getAccount(root, 0);
        const allPrivateKeys = [];
        for (let i = startIndex; i < startIndex + addressNumber; i++) {
          const privateKey = getPrivateKey(account, i);
          const address = getAddress(account, i);
          allPrivateKeys.push({ address: address, key: privateKey });
        }
        setPrivateKeys(allPrivateKeys);
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

      {privateKeys.length > 0 && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Index
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Private Key
                </th>
              </tr>
            </thead>
            <tbody>
              {privateKeys.map((privateKey, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index}
                  </th>
                  <td className="px-6 py-4">{privateKey.address}</td>
                  <td className="px-6 py-4">
                    <span
                      className="cursor-pointer text-3xl"
                      onClick={() => {
                        copyTextToClipboard(privateKey.key);
                        alert("Copied the private key!");
                      }}
                    >
                      &#x2398;
                    </span>
                    &nbsp;&nbsp;
                    {privateKey.key}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
