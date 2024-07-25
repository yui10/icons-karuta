import { createIconsUrl } from '@/utils/iconUtil';
import { Grid, Paper, Typography } from '@mui/material';
import { IconData } from 'simple-icons/sdk';

type IconGridProps = {
    iconList: IconData[];
    iconClick: (icon: IconData) => void;
};
const IconGrid = (props: IconGridProps) => {
    const { iconList, iconClick } = props;
    return (
        <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            rowSpacing={{ xs: 1, sm: 2, md: 3 }}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
            {iconList.map((icon, index) => {
                return (
                    <Grid item key={index} xs={6} sm={4} md={3} lg={3} xl={2}>
                        <Paper
                            elevation={3}
                            onClick={() => iconClick(icon)}
                            component="img"
                            alt=""
                            src={createIconsUrl(icon, 0)}
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        />
                        {process.env.NODE_ENV === 'development' && (
                            <Typography variant="body1" component="p" align="center">
                                {icon.title}
                            </Typography>
                        )}
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default IconGrid;
