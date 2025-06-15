"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ethers } from "ethers";
import { DAO_CONNECT_ABI } from "./abis"; // Adjust import path as needed

interface DAOFormData {
  name: string;
  description: string;
  nftSupply: string;
}

interface Web3ContextType {
  // Wallet & Contract State
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  contract: ethers.Contract | null;
  account: string;
  isConnected: boolean;
  loading: boolean;

  // Contract Data
  ownerAddress: string;
  amountRequired: string;
  amountRequiredFormatted: string;
  daoCount: number;
  allDAOs: string[];

  // Actions
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  createDAO: (formData: DAOFormData) => Promise<void>;
  loadContractData: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

interface Web3ProviderProps {
  children: ReactNode;
  contractAddress: string;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({
  children,
  contractAddress,
}) => {
  // Wallet & Contract State
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Contract Data
  const [ownerAddress, setOwnerAddress] = useState<string>("");
  const [amountRequired, setAmountRequired] = useState<string>("0");
  const [amountRequiredFormatted, setAmountRequiredFormatted] =
    useState<string>("0");
  const [daoCount, setDaoCount] = useState<number>(0);
  const [allDAOs, setAllDAOs] = useState<string[]>([]);

  // Connect to MetaMask
  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          DAO_CONNECT_ABI,
          signer,
        );

        setProvider(provider);
        setSigner(signer);
        setContract(contract);
        setAccount(accounts[0]);
        setIsConnected(true);

        // Load contract data
        await loadContractDataInternal(contract);
      } else {
        alert("Please install MetaMask!");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Error connecting wallet. Please try again.");
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setContract(null);
    setAccount("");
    setIsConnected(false);
    setOwnerAddress("");
    setAmountRequired("0");
    setAmountRequiredFormatted("0");
    setDaoCount(0);
    setAllDAOs([]);
  };

  // Load contract data (internal function)
  const loadContractDataInternal = async (
    contractInstance: ethers.Contract,
  ) => {
    try {
      const [daos, owner, required] = await Promise.all([
        contractInstance.getAllDAOs(),
        contractInstance.factoryOwner(),
        contractInstance.amountRequired(),
      ]);

      const formattedRequired = ethers.formatUnits(required, 9);

      setAllDAOs(daos);
      setOwnerAddress(owner);
      setAmountRequired(required.toString());
      setAmountRequiredFormatted(formattedRequired);
      setDaoCount(daos.length);
    } catch (error) {
      console.error("Error loading contract data:", error);
    }
  };

  // Load contract data (public function)
  const loadContractData = async () => {
    if (contract) {
      await loadContractDataInternal(contract);
    }
  };

  // Create DAO function
  const createDAO = async (formData: DAOFormData) => {
    if (!contract || !signer) {
      throw new Error("Please connect your wallet first!");
    }

    if (!formData.name || !formData.description) {
      throw new Error("Please fill in all fields!");
    }

    setLoading(true);
    try {
      const weiAmount = ethers.parseUnits(amountRequired, 9);

      const tx = await contract.createDAO(
        formData.name,
        formData.description,
        formData.nftSupply || "3000", // Use provided supply or default
        { value: weiAmount },
      );

      console.log("Transaction sent:", tx.hash);
      await tx.wait();

      // Reload contract data after successful creation
      await loadContractDataInternal(contract);

      return tx;
    } catch (error) {
      console.error("Error creating DAO:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Listen for account changes
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else if (accounts[0] !== account) {
          setAccount(accounts[0]);
        }
      };

      const handleChainChanged = () => {
        // Reload the page when chain changes
        window.location.reload();
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener(
            "accountsChanged",
            handleAccountsChanged,
          );
          window.ethereum.removeListener("chainChanged", handleChainChanged);
        }
      };
    }
  }, [account]);

  // Auto-connect if previously connected
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            await connectWallet();
          }
        } catch (error) {
          console.error("Error checking connection:", error);
        }
      }
    };

    checkConnection();
  }, [contractAddress]);

  const contextValue: Web3ContextType = {
    // State
    provider,
    signer,
    contract,
    account,
    isConnected,
    loading,
    ownerAddress,
    amountRequired,
    amountRequiredFormatted,
    daoCount,
    allDAOs,

    // Actions
    connectWallet,
    disconnectWallet,
    createDAO,
    loadContractData,
  };

  return (
    <Web3Context.Provider value={contextValue}>{children}</Web3Context.Provider>
  );
};

// Custom hook to use the Web3 context
export const useWeb3 = (): Web3ContextType => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};
