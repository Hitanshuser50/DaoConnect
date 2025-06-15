"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Link from "next/link";
import { DAO_CONNECT_ABI } from "./abis";

interface DAOFormData {
  name: string;
  description: string;
  nftSupply: string;
}

interface DAOConnectProps {
  contractAddress: string; // You'll need to provide this after deployment
}

const DAOConnect: React.FC<DAOConnectProps> = ({ contractAddress }) => {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [showInEth, setShowInEth] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string>("");
  const [ownerAddress, setOwnerAddress] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [amountRequired, setAmountRequired] = useState<string>("0");
  const [daoCount, setDaoCount] = useState<number>(0);
  const [allDAOs, setAllDAOs] = useState<string[]>([]);
  const [formData, setFormData] = useState<DAOFormData>({
    name: "",
    description: "",
    nftSupply: "",
  });

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

        console.log(contract);
        setProvider(provider);
        setSigner(signer);
        setContract(contract);
        setAccount(accounts[0]);
        setIsConnected(true);

        // Load contract data
        await loadContractData(contract);
      } else {
        alert("Please install MetaMask!");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      alert("Error connecting wallet. Please try again.");
    }
  };

  // Load contract data
  const loadContractData = async (contractInstance: ethers.Contract) => {
    try {
      const daos = await contractInstance.getAllDAOs();
      const owner = await contractInstance.factoryOwner();
      const required = await contractInstance.amountRequired();
      const formattedRequired = ethers.formatUnits(required, 9);
      const count = daos.length;

      setShowInEth(formattedRequired);

      setAmountRequired(formattedRequired);
      setAmountRequired(required.toString());

      setDaoCount(Number(count));
      setAllDAOs(daos);
      setOwnerAddress(owner);
    } catch (error) {
      console.error("Error loading contract data:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Create DAO
  const createDAO = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract || !signer) {
      alert("Please connect your wallet first!");
      return;
    }

    if (!formData.name || !formData.description) {
      alert("Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      const daos = await contract.getAllDAOs();
      const weiAmount = ethers.parseUnits(amountRequired, 9);
      console.log("weiwei", weiAmount);
      // console.log("Amount in Wei:", weiAmount.toString());
      console.log(typeof amountRequired);
      const tx = await contract.createDAO(
        formData.name,
        formData.description,
        "3000",
        { value: weiAmount },
      );

      console.log("Transaction sent:", tx.hash);
      await tx.wait();

      alert("DAO created successfully!");

      // Reset form
      setFormData({
        name: "",
        description: "",
        nftSupply: "",
      });

      // Reload contract data
      await loadContractData(contract);
    } catch (error) {
      console.error("Error creating DAO:", error);
      alert("Error creating DAO. Please check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // Effect to load data when contract changes
  useEffect(() => {
    if (contract) {
      loadContractData(contract);
    }
  }, [contract]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        DAO Connect Interface
      </h1>

      {/* Wallet Connection */}
      <div className="mb-8 text-center">
        {!isConnected ? (
          <button
            onClick={connectWallet}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="bg-green-100 p-4 rounded-lg">
            <p className="text-green-800">
              {`Contract Address: ${contractAddress.slice(0, 6)}...${contractAddress.slice(-4)}`}
            </p>
          </div>
        )}
      </div>

      {isConnected && (
        <>
          {/* Contract Information */}
          <div className="mb-8 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Contract Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Amount Required</p>
                <p className="text-lg font-bold text-gray-800">
                  {showInEth} ETH
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">DAO Count</p>
                <p className="text-lg font-bold text-gray-800">{daoCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Owner Address</p>
                <p className="text-sm font-mono text-gray-800">
                  {ownerAddress
                    ? `${ownerAddress.slice(0, 6)}...${ownerAddress.slice(-4)}`
                    : "Not connected"}
                </p>
              </div>
            </div>
          </div>

          {/* Create DAO Form */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Create New DAO
            </h2>
            <form onSubmit={createDAO} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DAO Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter DAO name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter DAO description"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
              >
                {loading ? "Creating DAO..." : `Create DAO (${showInEth} ETH)`}
              </button>
            </form>
          </div>

          {/* List of DAOs */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              All DAOs
            </h2>
            {allDAOs.length === 0 ? (
              <p className="text-gray-600">No DAOs created yet.</p>
            ) : (
              <div className="space-y-2">
                {allDAOs.map((dao, index) => (
                  <Link key={index} href={`/dao/${dao}`}>
                    <div className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
                      <p className="font-mono text-sm">
                        {index + 1}. {dao}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DAOConnect;
