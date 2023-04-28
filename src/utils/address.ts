const BIP86 = require("bip86");

export const getRootAccount = (mnemonic: string) =>
  new BIP86.fromMnemonic(mnemonic);

export const getAccount = (root: any, index: number) =>
  new BIP86.fromXPrv(root.deriveAccount(index));

export const getAddress = (account: any, index: number) =>
  account.getAddress(index);

export const getPrivateKey = (account: any, index: number) =>
  account.getPrivateKey(index, false);
