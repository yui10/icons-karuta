'use client';
import { useLanguage, useTranslation } from '@/i18n/client';
import { AppBar, Box, MenuItem, TextField, Toolbar, Typography } from '@mui/material';
import React from 'react';

const Header = () => {
    const { language } = useLanguage();
    const { t } = useTranslation(language);

    const redirect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const lang = e.target.value;
        const path = window.location.pathname;
        if (path.startsWith(`/${language}`))
            window.location.href = path.replace(`/${language}`, `/${lang}`);
        else window.location.href = `/${lang}`;
    };

    return (
        <AppBar
            component="header"
            position="static"
            sx={{ marginTop: 'auto', backgroundColor: '#0F0F0F' }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {t('translation:app_name')}
                    </Typography>
                </Box>
                {/** Language switching menu */}
                <Box sx={{ textAlign: 'right', backgroundColor: 'white' }}>
                    <TextField
                        select
                        variant="standard"
                        defaultValue={language}
                        onChange={redirect}
                    >
                        <MenuItem value="ja">日本語</MenuItem>
                        <MenuItem value="en">English</MenuItem>
                    </TextField>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
