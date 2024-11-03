//per la creazione dei miei glifi mi sono ispirata alle costellazioni, con variabili visive nei colori e nella forma
//ho usato la trasformazione di traslazione

let griglia = 3;//punti griglia (3x3)
let padding = 0.25;//padding glifo(25%)
let margine = 100;//margine pagina

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(0.7) //ripetere il disegno in modi diversi
}
//quando modifico la finestra ridisegno
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); 
  redraw(); 
}
function draw() {
  background(0,0,30);
// dimensioni utilizzabili (senza margini)
let larghezzatela = width - 2 * margine; 
let altezzatela = height - 2 * margine; 

// costellazioni che possono essere disegnate in base allo schermo
let numcostellazioniX = floor(larghezzatela / 100); //colonne
let numcostellazioniY = floor(altezzatela / 100); //righe
//ricorda floor arrotonda per difetto al numero intero più vicino, numero di colonne/righe complete
let dimcostellazioni = min(larghezzatela / numcostellazioniX, altezzatela / numcostellazioniY);
// larghezza e altezza griglia
let larghezzatotale = dimcostellazioni * numcostellazioniX; 
let altezzatotale = dimcostellazioni * numcostellazioniY;
// padding per centrare la griglia 
let offsetX = margine + (larghezzatela - larghezzatotale) / 2; 
let offsetY = margine + (altezzatela - altezzatotale) / 2;

// griglia in base agli offset 
//cx indice della colonna 
//cy indice della riga 
  for (let cx = 0; cx < numcostellazioniX; cx++) { 
    for (let cy = 0; cy < numcostellazioniY; cy++) { 
      push();//stato corrente salvo
      translate(offsetX, offsetY);//centro
      costellazioni(cx * dimcostellazioni, cy * dimcostellazioni, dimcostellazioni);
      //passo dalle coordinate cx e cy moltiplicate per la dimensione delle costellazioni, ho la posizione di ogni costellazione nella griglia 
      pop();//annullo le cose dopo push
    }
  }
//stelle di sfondo
//stelle messe in modo casuale 
  let numstelle = (width * height) / 1000; 
  for (let i = 0; i < numstelle; i++) {
    stroke(255, random(100, 200)); 
    strokeWeight(random(0.5, 1.5));
    point(random(width), random(height));
  }
}

//costellazioni glifi
// start sono le coordinate da cui inizio a disegnare e la dimensione è de glifo
function costellazioni(startX, startY, dimensione) {
  push(); 
  translate(startX, startY);//tutti i disegni successivi saranno relativi a questo nuovo punto
  let dimensioneefficace = dimensione * (1 - padding * 2); //la dimensione del glifo sottraendo il padding
  let punti = puntigriglia(dimensioneefficace); //array di punti su cui disegnare in base alla dimensione efficace 
  let puntiselezionati = punticasuali(punti, floor(random(2, 8))); //un numero casuale di punti dall'array utilizzando la funzione punticasuali

//linee bianche con opacità 200
  stroke(255, 200); 
  strokeWeight(0.5); 
  for (let i = 0; i < puntiselezionati.length - 1; i++) {
    line(puntiselezionati[i].x, puntiselezionati[i].y, puntiselezionati[i + 1].x, puntiselezionati[i + 1].y);
  }
//ciclo per i punti selezionati,si ferma all'ultimo punto(qui length-1) per non andare al punto successivo che non esiste
//linea tra ciascun punto selezionato e il punto successivo, line usa coordinate dei punti selezionati

//cerchi nei punti selezionati di una costellazione utilizzando colori casuali e dimensioni
  puntiselezionati.forEach(point => { //forEach per andare attraverso ogni punto nell'array
    let giallo = color(random(200, 255), random(150, 255), 0);// punti gialli random
    let dimensionepunto = random(2, 6);
    let bianco = random() < 0.3; // 30% di probabilità che il punto sia bianco con quindi variabile visiva
    if (bianco) {
      fill(255);
  } else {
      fill(giallo); 
  }
  noStroke(); 
  ellipse(point.x, point.y, dimensionepunto, dimensionepunto);//utilizo le coordinate del punto corrente
  });//ricordati la tonda perchè è ancora aprta la funzione
  pop(); 
}

//array di punti(vettori) in griglia
//ogni punto avrà coordinate specifiche basate sulla dimensione della griglia e sul padding
function puntigriglia(dimensione) {
  let punti = []; 
  let padsize = dimensione * padding;
  for (let i = 0; i < griglia; i++) { 
    for (let j = 0; j < griglia; j++) { //matrice 3x3 di punti come la griglia
      punti.push(createVector( //createVector rappresenta un punto nello spazio bidimensionale 
        padsize + (dimensione * i)/(griglia - 1), 
        padsize + (dimensione * j)/(griglia - 1)
//per x: agiiungo padszie al risultato di (dimensione * i)/(griglia - 1), che distribuisce i punti lungo l'asse x in base alla loro posizione nella griglia
//per y: stessa logica, ma con l'indice j, per distribuire i punti lungo l'asse y
      ));
    }
  }
  return punti; //contiene tutti i punti generati nella griglia.
}
// seleziono un certo numero di punti casuali dall' array di punti no duplicati
function punticasuali(punti, count) { //count è il numero di punti selezionati
  let selezionati = []; //creo un array vuoto i punti selezionati
  while (selezionati.length < count) { //continua finché la lunghezza dell'array selezionati è inferiore al valore di count, la funzione seleziona il numero richiesto di punti
    let punto = random(punti); //seleziono casualmente un punto dall'array
    if (!selezionati.includes(punto)) { //controllo se il punto selezionato casualmente è già presente nell'array selezionati ho così true e false
      //operatore di negazione ! quindi la condizione è vera solo se il punto non è già presente in selezionati
      selezionati.push(punto); // se è vero il punto viene aggiunto all'array selezionati tramite selezionati.push(punto)
    }
  }
  return selezionati; //array di punti selezionati
}

