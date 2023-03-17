import Table from 'react-bootstrap/Table';

const Ikonice = ({product}) => {

    const  { mesto_sadnje, high:visina_biljke , type_of_plant, sirina_biljke  } = product
    let filter = null
    let hlad = null
    let polusenka = null
    let sunce = null
    if(Array.isArray(mesto_sadnje)){
        const [sunce, hlad , polusenka] = mesto_sadnje
        filter = {sunce, hlad, polusenka, visina_biljke , type_of_plant, sirina_biljke }
               
    }else{
        let [sunce, hlad , polusenka] = [mesto_sadnje]
        filter = {sunce, hlad , polusenka, visina_biljke , type_of_plant, sirina_biljke }
     
    }
    
    console.log('F:', filter)
    
    const images = [
        {
            type:'type_of_plant',
            value: filter.type_of_plant,
            src: 'https://policplantblob.blob.core.windows.net/policplant-banner/listopadno50.png'
        },
        {
            type:'polusenka',
            value: filter.polusenka,
            src: 'https://policplantblob.blob.core.windows.net/policplant-banner/polusenka50.png'
        },
        {
            type:'sunce',
            value: filter.sunce,
            src: 'https://policplantblob.blob.core.windows.net/policplant-banner/sunce50.png'
        },
        {
            type:'hlad',
            value: filter.hlad,
            src: 'https://policplantblob.blob.core.windows.net/policplant-banner/senka50.png'
        },
        {
            type:'visina_biljke',
            value: filter.visina_biljke,
            src: 'https://policplantblob.blob.core.windows.net/policplant-banner/visina-biljke50.png'
        },
        {
            type: 'sirina_biljke',
            value: filter.sirina_biljke,
            src: 'https://policplantblob.blob.core.windows.net/policplant-banner/sirina-biljke50.png'
        }
    ]

    console.log('Images:', images)
    const filterImages = images?.filter(x => x.value?.length)
   
    
    return (
        <div>
            {filterImages && <Table style={{width:'auto', tableLayout: 'fixed'}} striped >
                <tbody>
                    <tr align='center'>
                        {filterImages?.map(image => (
                            <th key={image.value} style={{width:'1rem'}}><img src={image.src} alt={image.value}></img></th>
                        ))}
                    </tr>        
                    <tr>
                        {filterImages?.map(image => (
                            <td key={image.value} align='center' style={{width:'1rem'}}>{image.value}</td>
                        ))} 
                    </tr>
                
                </tbody>
            </Table>}
        </div>
    )

}

export default Ikonice