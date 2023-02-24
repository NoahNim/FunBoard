import { extendTheme } from "@chakra-ui/react";
import { StyleFunctionProps } from '@chakra-ui/theme-tools'

export const theme = extendTheme({
    styles: {
        global: (props: StyleFunctionProps) => ({
            body: {
                color: 'default',
                bg: '#A6A2A2',
            },
            button: {
                border: '3%'
            }
        }),
    },
})