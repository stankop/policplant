import React from "react";

function ONamaScreen() {

  const bordureImages = ['https://policplantblob.blob.core.windows.net/policplant-banner/Bordura1.png',
                        'https://policplantblob.blob.core.windows.net/policplant-banner/Bordura2.png',
                        'https://policplantblob.blob.core.windows.net/policplant-banner/Bordura3.png',
                        'https://policplantblob.blob.core.windows.net/policplant-banner/Bordura4.png',
                        'https://policplantblob.blob.core.windows.net/policplant-banner/Bordura5.png',
                        'https://policplantblob.blob.core.windows.net/policplant-banner/Bordura6.png',
                        'https://policplantblob.blob.core.windows.net/policplant-banner/Bordura7.png']
  return (
    <div>
      <h3>O nama</h3>
      <div style={{ padding:'1rem', maxWidth:'100%'}}>
          <img alt='Bordura' style={{ maxWidth:'100%'}}  src={bordureImages[(Math.random() * bordureImages.length) | 0]}></img>
      </div>
      <div>
      Rasadnik Ema je registrovano poljoprivredno gazdinstvo koje se bavi proizvodnjom i prodajom ukrasnih baštenskih sadnica. U ponudi imamo sadnice perena, 
      ukrasnog žbunja, trava, seduma, čuvarkuća, bobičastog voća, četinara i lišćara. Verujemo da ćete u našoj ponudi naći biljke koje će se savršeno uklopiti u Vaš vrt.<br></br><br></br> 

      Dobro došli! 
      </div>
    </div>
  );
}

export default ONamaScreen;
