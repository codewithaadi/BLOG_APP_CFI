import React from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow ,styled} from '@mui/material';
import { categories } from '../../constants/data';

const StyledTable = styled(Table)`
    border: 1px solid rgba(224,224,224,1);
`
const StyledButton = styled(Button)`
     margin : 20px;
     width: 85%;
     background: #6495ED;
     color: #FFF;
`
export default function Categories() {
    return (
        <>
            <StyledButton variant='contained'>Create Blog</StyledButton>
            <StyledTable>
                <TableHead>
                    <TableCell>
                        All Categories
                    </TableCell>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow key={category.id}>
                                <TableCell>{category.type}</TableCell>
                            </TableRow>
                        ))
                    }
                    <TableRow>
                        <TableCell>
                            Music
                        </TableCell>
                    </TableRow>
                </TableBody>
            </StyledTable>
        </>
    )
}
