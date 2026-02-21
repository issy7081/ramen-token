# $ramen トークン プロジェクト

このプロジェクトには、**Robinhood Chain Testnet**（テストネット）上に「`$ramen`」ERC-20トークンをデプロイ（発行）するためのソースコードと設定が含まれています。

## ネットワーク詳細（Robinhood Chain Testnet）
- **ネットワーク名:** Robinhood Chain Testnet
- **RPC URL:** `https://rpc.testnet.chain.robinhood.com`
- **チェーンID (Chain ID):** 46630
- **通貨シンボル:** ETH
- **フォーセット (Faucet):** [https://faucet.testnet.chain.robinhood.com/](https://faucet.testnet.chain.robinhood.com/)

## 必要な環境
- **Node.js**: グローバルにインストールされていること（ターミナルで `npm` コマンドが使える状態）
- **Web3 ウォレット**: MetaMask や Rabby などの拡張機能が、Robinhood Testnet 用に設定されていること。

## セットアップ手順

### 1. 依存関係のインストール
ターミナルでこのリポジトリのフォルダ（`ramen-token`）を開き、以下のコマンドを実行します。
```shell
npm install
```

### 2. 環境変数の設定 (秘密鍵の登録)
`ramen-token` フォルダの直下に、`.env` という名前のファイルを作成してください。その中に、あなたのウォレットのプライベートキー（秘密鍵）を記述します。
**注意: このファイル（秘密鍵）は絶対に他人に教えたり、GitHubにコミット（公開）しないでください！**

```env
PRIVATE_KEY=ここにあなたの秘密鍵を貼り付けます
```

### 3. テストネット用 ETH の取得 (Faucet)
1. [Robinhood Faucet](https://faucet.testnet.chain.robinhood.com/) にアクセスします。
2. ご自身のウォレットアドレスを入力し、テスト用のETHをリクエストします。

### 4. スマートコントラクトのコンパイル（構築）
コードが正しくコンパイルできるか確認します。
```shell
npx hardhat compile
```

### 5. Robinhood Chain Testnet へのデプロイ（発行）
Hardhat Ignition を使って、`$ramen` トークンをネットワーク上にデプロイします。
```shell
npx hardhat ignition deploy ignition/modules/RamenToken.js --network robinhood_testnet
```

成功すると、コンソール画面にデプロイされたコントラクトのアドレス（トークンのアドレス）が表示されます。このアドレスをMetaMaskなどのウォレットにインポート（追加）すると、発行された **1,000,000,000 (10億) $ramen** が確認できます！
