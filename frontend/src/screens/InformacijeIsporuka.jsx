

function InformacijeIsporuka() {

window.scrollTo({
    top: 100,
    left: 100,
    behavior: 'smooth'
    });
  return (
    <div>
      <h3 style={{marginTop:'1rem', color:'green'}}>Način isporuke </h3>
        <div>
        Minimalni iznos porudžbine ne može da bude manji od 1000rsd. Porudžbine koje nemaju naveden minimum neće se isporučivati. 
        Pošiljke šaljemo ISKLJUČIVO PostExpress kurirskom službom. Troškovi isporuke posebno se zaračunavaju i plaćaju, u skladu sa cenovnikom Post Express 
        službe i iznose od 450,00 dinara, pa naviše, zavisno od težine i vrednosti pošiljke i nije moguće ih izračunati unapred. Maksimalna težina paketa za 
        slanje PostExpress službom je 20 kg, u kutijama čije dimenzije ne prelaze 60x50x50cm.
        U suprotnom se pošiljka šalje kao CC paket, koja ima malo duži rok isporuke. Ukoliko ima više paketa za svaki se plaćaju troškovi isporuke.
        Nemamo mogućnost slanja paketa u inostranstvo. Vreme isporuke je od 2-5 radnih dana.  <br></br><br></br>
        <strong>BESPLATNA DOSTAVA</strong> je moguća na teritoriji grada Novog Sada, za svaku narudžbinu u vrednosti većoj od 2000rsd.


        <h3 style={{ color:'green'}}>Način plaćanja</h3> 

        Prilikom popunjavanja obrasca za poručivanje možete se odlučiti za jedan od dva načina plaćanja: plaćanje pouzećem ili uplatnicom na tekući račun.
        Na tekući račun uplaćujete samo iznos za poručene sadnice. Ptt troškove plaćate prilikom preuzimanja pošiljke sa sadnicama. 
        Ukoliko se odlučite za plaćanje pouzećem, iznos za sadnice i ptt troškove plaćate prilikom preuzimanja u pošti ili od kurira. 
        Kako bi pošiljka bila sigurno i brzo dostavljena do kupca, potrebno je da kupac navede tačne podatke prilikom formiranja porudžbine. 
        </div>
    </div>
  );
}

export default InformacijeIsporuka;
