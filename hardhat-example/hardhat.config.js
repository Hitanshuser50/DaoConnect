require('@nomicfoundation/hardhat-toolbox');
require('@parity/hardhat-polkadot');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: '0.8.28',
    resolc: {
        version: '1.5.2',
        compilerSource: 'npm',
        settings: {
            optimizer: {
                enabled: true,
                parameters: 'z',
                fallbackOz: true,
                runs: 200,
            },
        },
    },
    networks: {
        hardhat: {
            polkavm: true,
            nodeConfig: {
                nodeBinaryPath: 'INSERT_PATH_TO_SUBSTRATE_NODE',
                rpcPort: 8000,
                dev: true,
            },
            adapterConfig: {
                adapterBinaryPath: 'INSERT_PATH_TO_ETH_RPC_ADAPTER',
                dev: true,
            },
        },
    },
};
