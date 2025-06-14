# DaoConnect - Decentralized Governance Platform

## Environment Variables

### Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

\`\`\`bash
# Required for wallet connection (client-safe)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Optional app configuration (client-safe)
NEXT_PUBLIC_APP_NAME=DaoConnect
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Server-only variables (DO NOT prefix with NEXT_PUBLIC_)
ALCHEMY_API_KEY=your_alchemy_api_key
INFURA_PROJECT_ID=your_infura_project_id
GEMINI_API_KEY=your_gemini_api_key
\`\`\`

### Getting API Keys

1. **WalletConnect Project ID**: 
   - Visit [WalletConnect Cloud](https://cloud.walletconnect.com)
   - Create a free account and project
   - Copy your Project ID

2. **Alchemy API Key** (Optional):
   - Visit [Alchemy](https://www.alchemy.com)
   - Create account and get API key for better RPC performance

3. **Gemini API Key** (Optional):
   - For AI-powered governance insights
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)

### Security Notes

- Never commit `.env.local` to version control
- Server-only variables should NOT have `NEXT_PUBLIC_` prefix
- Only client-safe variables should use `NEXT_PUBLIC_` prefix
- API keys are only used server-side for enhanced features
