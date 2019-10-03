
export default {

    down(size){
        const Sizes = {
            xs: '576px',
            sm: '768px',
            md: '992px',
            lg: '1200px',
            xl: '1600px'
        }
        return `@media (max-width: ${Sizes[size]})`
    }

}