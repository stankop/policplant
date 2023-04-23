
import { Provider } from 'react-redux'
import store from '../store/store'
import Layout from '../compontents/UI/Layout';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

function App({Component, pageProps}){
    
    const [color, setColor] = useState(null)
    useEffect(() => setColor(
        <Layout>
            <Component {...pageProps}></Component>
        </Layout>), [])

    return( 
    <Provider store = {store}>
        <div>
            <div suppressHydrationWarning> 
                {color}
            </div>
        </div>
    </Provider>)
}

export default App