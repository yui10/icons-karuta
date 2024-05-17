'use client'
import { useLanguage, useTranslation } from "@/i18n/client";
import { AppBar, Box, Container, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    const { language } = useLanguage();
    const { t } = useTranslation(language);

    return (
        <AppBar component="footer" position="static" sx={{ marginTop: 'auto', backgroundColor: '#0F0F0F' }}>
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="caption">
                        ©2024 <Link href="https://github.com/yui10">yui10</Link>
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="caption">
                        <Link href="/privacy-policy">{t("translation:privacy-policy")}</Link>
                    </Typography>
                </Box>
            </Container>
        </AppBar>
    )
}

export default Footer
