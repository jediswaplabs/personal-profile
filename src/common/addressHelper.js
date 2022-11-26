import { validateAndParseAddress } from 'starknet';

export const isZeroAddress = (hexNumberString = '') => /^0x0*$/.test(hexNumberString);

export const isValidAddress = (address = '') => {
  try {
    if (address && !isZeroAddress(address)) { return validateAndParseAddress(address); }
    return false;
  } catch {
    return false;
  }
};

export const getShortenAddress = (address = '', chars = 4) => {
  const parsed = isValidAddress(address);
  if (!parsed) { return address; }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(63 - chars)}`;
};
