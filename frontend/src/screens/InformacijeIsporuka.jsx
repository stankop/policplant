

function InformacijeIsporuka() {

window.scrollTo({
    top: 100,
    left: 100,
    behavior: 'smooth'
    });
  return (
    <div>
      <h3>Isporuka</h3>
        <div>
            Minimalni iznos porudžbine ne može da bude manji od 1000rsd. Porudžbine koje nemaju naveden minimum neće se isporučivati. 
            Troškovi isporuke na celoj teritoriji Srbije posebno se zaračunavaju i plaćaju, u skladu sa cenovnikom Post Express službe i iznose od 450,00 dinara, pa naviše,
            zavisno od težine i vrednosti pošiljke. Maksimalna težina paketa za slanje PostExpress službom je 20 kg, u kutijama čije dimenzije ne prelaze 60x50x50cm.
            U suprotnom se pošiljka šalje kao CC paket, koja ima malo duži rok isporuke. Ukoliko ima više paketa za svaki se plaćaju troškovi isporuke.
            Prilikom prijema plaća se vrednost robe + troškovi isporuke. Kako bi pošiljka bila sigurno i brzo dostavljena do kupca, potrebno je da kupac navede tačne podatke 
            prilikom formiranja porudžbine. Vreme isporuke je od 2-5 radnih dana. 
        </div>
    </div>
  );
}

export default InformacijeIsporuka;
