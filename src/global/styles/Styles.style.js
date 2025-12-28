// Single Source of Truth (Única Fuente de Verdad).
import { Colors } from './_Colors.style';


const globalStyles = {
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#393E46' // Luego usaremos tu archivo de colores
    },
    title: {
        color: '#EEEEEE',
        fontSize: 20,
        fontWeight: 'bold'
    }
};

export { globalStyles, Colors };