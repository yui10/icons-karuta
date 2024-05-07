import { Container } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const PrivacyPolicy = () => {
    return (
        <Container>
            <h1>Privacy Policy</h1>
            <h2>アクセス解析ツールについて</h2>
            <div>当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を使用しています。</div>
            <div>このGoogle Analyticsはトラフィックデータの収集のためにCookieを使用していますが、
                トラフィックデータは匿名で収集されており、個人を特定するものではありません。
                この機能はCookieを無効にすることで収集を拒否することができますので、お使いのブラウザの設定をご確認ください。</div>
            <div>詳細については、<Link href="https://marketingplatform.google.com/about/analytics/terms/jp/">Googleアナリティクスサービス利用規約</Link>のページをご覧ください。</div>

        </Container>
    )
}

export default PrivacyPolicy;
