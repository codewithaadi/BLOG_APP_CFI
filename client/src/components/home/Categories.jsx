import React from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

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
const StyledLink = styled(Link)`
    text-decoration : none;
    color:inherit;
`

export default function Categories() {

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    return (
        <>
            <StyledLink to={`/create?category=${category || ''}`}>
                <StyledButton variant='contained'>Create Blog</StyledButton>
            </StyledLink>

            <StyledTable>
                <TableHead>
                    <TableCell>
                        <StyledLink to='/'> 
                            All Categories
                        </StyledLink>
                    </TableCell>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow key={category.id}>
                                <StyledLink to={`/?category=${category.type}`}>
                                <TableCell>{category.type}</TableCell>
                                </StyledLink>
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
