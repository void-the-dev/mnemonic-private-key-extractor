import { Key } from "@/types";
import { copyTextToClipboard } from "@/utils/javascript";
import React from "react";

type Props = {
  title: string;
  keys: Key[];
};
const KeyTable = ({ title, keys }: Props) => {
  return (
    <>
      <h2 className="text-xl mb-3 pt-4">{title}</h2>
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
            {keys.map((privateKey, index) => (
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
    </>
  );
};

export default KeyTable;
