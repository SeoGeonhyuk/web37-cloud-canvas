import CloudGraph from '@/src/CloudGraph';
import Header from '@components/Layout/Header';
import Sidebar from '@components/Layout/Sidebar';
import { useSelectionContext } from '@contexts/SelectionContext';
import useGraphActions from '@hooks/useGraphActions';
import {
    AppBar,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Toolbar,
    Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';

const PropertiesBar = () => {
    return (
        <AppBar
            position="absolute"
            color="default"
            sx={{ top: 0, left: 0, right: 0, padding: '20px 0' }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    gap: 2,
                }}
            >
                <Typography variant="h6">Properties</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* {selectedCloud.properties && */}
                    {/*     Object.entries(selectedCloud.properties).map( */}
                    {/*         ([key, value]) => { */}
                    {/*             return ( */}
                    {/*                 <Select */}
                    {/*                     id={key} */}
                    {/*                     value={groups[key]} */}
                    {/*                     displayEmpty */}
                    {/*                     onChange={(e: SelectChangeEvent) => */}
                    {/*                         handleChange(e, key) */}
                    {/*                     } */}
                    {/*                     sx={{ width: 200 }} */}
                    {/*                 > */}
                    {/*                     <MenuItem value="">None</MenuItem> */}
                    {/*                     <MenuItem value={'seoul'}> */}
                    {/*                         Seoul */}
                    {/*                     </MenuItem> */}
                    {/*                     <MenuItem value={'china'}> */}
                    {/*                         China */}
                    {/*                     </MenuItem> */}
                    {/*                     <MenuItem value={'japan'}> */}
                    {/*                         Japan */}
                    {/*                     </MenuItem> */}
                    {/*                 </Select> */}
                    {/*             ); */}
                    {/*         }, */}
                    {/*     )} */}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

function App() {
    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
            }}
        >
            <Sidebar />
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                }}
            >
                <Header />
                <Box
                    sx={{
                        position: 'relative',
                    }}
                >
                    <PropertiesBar />
                    <CloudGraph />
                </Box>
            </Box>
        </Box>
    );
}

export default App;
