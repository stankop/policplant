import  GoogleApiWrapper from '../compontents/UI/GoogleApiWrapper';

function KontakScreen() {
  
  return (
    <div>
      <h3 style={{marginTop:'1rem', color:'green'}}>Kontaktirajte nas</h3>
      <div>
        <h4 style={{ color:'green', marginLeft:'1rem'}}>Nasa lokacija</h4>
        <div style={{ marginBottom:'2rem', padding:'1rem'}}>
          <GoogleApiWrapper></GoogleApiWrapper>
        </div>
        {/* <div>
          Rasadnk Ema Budisava, Vojvodina, Srbija
          Prnjavorska 114
          21242 Budisava, Novi Sad, Vojvodina, Srbija
        </div> */}
        
      </div>
    </div>
  );
}

export default KontakScreen;
