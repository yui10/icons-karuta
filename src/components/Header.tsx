'use client';
import { useLanguage, useTranslation } from '@/i18n/client';
import { availableLanguages, availableLanguagesLabels } from '@/i18n/settings';
import { AppBar, Box, MenuItem, TextField, Toolbar, Typography } from '@mui/material';
import { escape } from 'querystring';
import React from 'react';

const Header = () => {
    const { language } = useLanguage();
    const { t } = useTranslation(language);

    const redirect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const lang = e.target.value;
        const path = window.location.pathname;
        const index = availableLanguages.indexOf(lang);
        if (index === -1) return;

        const new_lang = `/${availableLanguages[index]}`;
        let new_path: string = new_lang;
        if (path.startsWith(`/${language}`)) {
            new_path = path.replace(`/${language}`, new_lang);
        }

        window.location.href = escape(new_path);
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
                        {availableLanguagesLabels.map(({ lang, label }) => (
                            <MenuItem key={lang} value={lang}>
                                {label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
