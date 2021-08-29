import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  const [citas, guardarCitas] = useState(citasIniciales);

  useEffect(() => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }else{
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
  }

  const deleteCita = id => {
     const nuevasCitas = citas.filter(cita => cita.id !== id);
     guardarCitas(nuevasCitas)
  }

  const titulo = citas.length === 0 ? 'No Hay Citas' : 'Administra tus citas'

  return (
    <Fragment>
    {console.log(citas)}
      <h1>Admin pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
              <Formulario
                crearCita={crearCita}
              />
          </div>
          <div className="one-half column">
              <h1>{titulo}</h1>

              {citas.map(cita => (
                <Cita
                  key={cita.id}
                  cita={cita}
                  deleteCita={deleteCita}
                />
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
