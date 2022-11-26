import { argentX, braavosWallet } from './connectors';
import argentXIcon from '../resources/icons/argentx.svg';
import braavosIcon from '../resources/icons/braavos.svg';

const zeroAddress = '0x0000000000000000000000000000000000000000000000000000000000000000';

export {
  zeroAddress,
};

export const NetworkContextName = 'NETWORK';

export const SUPPORTED_WALLETS = {
  ArgentX: {
    connector: argentX,
    name: 'Argent-X',
    icon: argentXIcon,
    description: 'Starknet Browser Wallet',
    href: null,
    color: '#FF875B',
  },
  Braavos: {
    connector: braavosWallet,
    name: 'Braavos',
    icon: braavosIcon,
    description: 'Braavos Wallet for Starknet',
    href: null,
    color: '#E0B137',
    size: 30,
  },
};

export const chainIds = {
  MAINNET: 1,
};

export const NETWORK_LABELS = {
  [chainIds.MAINNET]: 'Mainnet',
  unknown: 'Unknown',
};

export const STARKSCAN_PREFIXES = {
  1: '',
  3: 'testnet.',
  4: 'testnet.',
  5: 'testnet.',
  42: 'testnet.',
};
