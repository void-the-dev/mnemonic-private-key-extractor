const BIP86 = require("bip86");

export const getRootAccount = (mnemonic: string, passphrase: string) =>
  new BIP86.fromMnemonic(mnemonic, passphrase);

export const getAccount = (root: any, index: number) =>
  new BIP86.fromXPrv(root.deriveAccount(index));

export const getAddress = (account: any, index: number, change: boolean) =>
  account.getAddress(index, change);

export const getPrivateKey = (account: any, index: number, change: boolean) =>
  account.getPrivateKey(index, change);
